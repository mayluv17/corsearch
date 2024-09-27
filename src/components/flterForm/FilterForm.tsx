import { useRef, useState } from 'react';
import styles from './filterForm.module.css';

type FilterFormType = {
  onFormChange: (searchQry: string, keyToSort:string, order: string) => void;

};

const FilterForm = ({ onFormChange }: FilterFormType) => {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "asc",
  });

  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = () => {
    onFormChange(searchRef.current!.value,sortDescriptor.column, sortDescriptor.direction);
    setSortDescriptor(prev => ({...prev, direction: 'asc',}))
  };

  const newOrder = sortDescriptor.direction === 'asc' ? 'desc' : 'asc';

  const setOrderKey = (e: React.MouseEvent<HTMLButtonElement>,orderKey:string)=>{
    e.preventDefault();
    setSortDescriptor({direction:newOrder,column:orderKey})
    onFormChange(searchRef.current!.value,orderKey, newOrder);
  }

  const ShowSortDir = (props:{keyToSort:string})=>{
    if(props.keyToSort !== sortDescriptor.column) return <></>
    return <>{sortDescriptor.direction === "asc" ? <span>&uarr;</span> : <span>&darr;</span>}</>
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
        <div className={styles.formButtons}><button onClick={(e)=>setOrderKey(e,'name')}>Name <ShowSortDir keyToSort={'name'}/></button>
        <button onClick={(e)=>setOrderKey(e,'email')}>Email <ShowSortDir keyToSort={'email'}/></button></div>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
