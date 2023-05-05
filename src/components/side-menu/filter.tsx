import {FC} from 'react';
import {Tree, TreeProps} from 'antd';
import {IType} from '@/models/type';

interface FilterProps {
  data?: IType[]
}

const Filter: FC<FilterProps> = ({data}) => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  const treeData = data?.map(type => ({
    title: type.name,
    key: `${type.id}`,
    children: type.childBrands.map(brand => ({ title: brand.name, key: `${type.id}-${brand.id}` }))
  }));

  return (
    <Tree
      checkable
      onCheck={onCheck}
      selectable={false}
      treeData={treeData}
    />
  );
};

export default Filter;