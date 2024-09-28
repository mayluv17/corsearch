import { useRef, useState } from 'react';
import styles from './filterForm.module.css';
import { ISortDescriptor, column, direction } from '../../interface';
import { ShowSortDir } from '../../utilities';

type FilterFormType = {
  onFormChange: (searchQry: string, keyToSort: column, order: direction) => void;

};

const FilterForm = ({ onFormChange }: FilterFormType) => {
  const [sortDescriptor, setSortDescriptor] = useState<ISortDescriptor>({
    column: "name",
    direction: "asc",
  });

  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = () => {
    onFormChange(searchRef.current!.value, sortDescriptor.column, sortDescriptor.direction);
    setSortDescriptor(prev => ({...prev, direction: 'asc'}))
  };

  const newOrder = sortDescriptor.direction === 'asc' ? 'desc' : 'asc';

  const setOrderKey = (e: React.MouseEvent<HTMLButtonElement>, orderKey: column)=>{
    e.preventDefault();
    setSortDescriptor({ direction:newOrder, column: orderKey })
    onFormChange(searchRef.current!.value, orderKey, newOrder);
  }
  return (
    <form>
      <div className={styles.formWrap}>
        <div>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            ref={searchRef}
            onChange={handleSearchChange}
            placeholder="Search user..."
          />
        </div>
        <div>
          <label htmlFor="order">Order</label>          
        <div className={styles.formButtons}><button onClick={(e)=>setOrderKey(e,'name')}>Name 
        { ShowSortDir('name', sortDescriptor)}</button>
        <button onClick={(e)=>setOrderKey(e,'email')}>Email 
       { ShowSortDir('email', sortDescriptor)}
        </button>
        </div>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
