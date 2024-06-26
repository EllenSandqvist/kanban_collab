import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../styling/Footer.module.css";
import useActiveUser from "../customHooks/useActiveUser";
import { useEffect } from "react";

const Footer = () => {
  const activeUser = useSelector((state) =>
    state.allUsersReducer.users.find((u) => u.userActive)
  );
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={styles.footer}
      style={{
        backgroundColor: activeUser.settings.header,
        color: activeUser.settings.headerText,
      }}
    >
      <div className={styles.footerContent}>
        <ul
          className={styles.footerLinks}
          style={{
            color: activeUser.settings.headerText,
          }}
        >
          <li>
            <NavLink
              className={styles.active}
              style={{
                color: activeUser.settings.headerText,
              }}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.active}
              style={{
                color: activeUser.settings.headerText,
              }}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.active}
              style={{
                color: activeUser.settings.headerText,
              }}
              to="/settings"
            >
              Settings
            </NavLink>
          </li>
        </ul>
        <p>&copy; {currentYear} Kanban App</p>
      </div>
    </footer>
  );
};

export default Footer;
