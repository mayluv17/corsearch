import { IUserData } from '../../interface';
import styles from './usercard.module.css';

const UserCard = ({ userData }: IUserData) => {
    return (
        <div className={styles.userWrap}>
          <div className={styles.left}>
            <h4>{userData.name.split(' ')[0]}</h4>
            <h6>{userData.name.split(' ')[1]}</h6>
          </div>
          <div className={styles.right}>
            <ul>
              <li>Email <p>{userData.email}</p></li>
              <li>Phone <p>{userData.phone}</p></li>
              <li>Website <p>{userData.website}</p></li>
              <li>Address <p>{`${userData.address.street}, ${userData.address.street}, ${userData.address.zipcode}.`}</p></li>
            </ul>
          </div>
        </div>
    )
}
export default UserCard;