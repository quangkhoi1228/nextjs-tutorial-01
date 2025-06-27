import React from 'react';
import Tilte from './Tilte';
import UtilityContainer from './UtilityContainer';
import AddnewButton from './AddnewButton';
import SearchInput from './SearchInput';
import Pagination from './Pagination';


interface EntityToolbarProps {
  title: string;
  onAdd: () => void;
  searchValue: string;
  onSearch: (value: string) => void;
  searchPlaceholder?: string;
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  children?: React.ReactNode; // Để chèn thêm các utility khác nếu cần
}

export default function EntityToolbar({
  title,
  onAdd,
  searchValue,
  onSearch,
  searchPlaceholder = 'Tìm kiếm...',
  currentPage,
  onPreviousPage,
  onNextPage,
  children,
}: EntityToolbarProps) {
  return (
    <>
      <Tilte>{title}</Tilte>
      <UtilityContainer>
        <div className='self-start'>
          <AddnewButton onClick={onAdd} />
        </div>
        <div className='self-end'>
          <SearchInput
            value={searchValue}
            onChange={onSearch}
            placeholder={searchPlaceholder}
          />
        </div>
        {children}
      </UtilityContainer>
      <Pagination
        currentPage={currentPage}
        onPrevious={onPreviousPage}
        onNext={onNextPage}
      />
    </>
  );
} 