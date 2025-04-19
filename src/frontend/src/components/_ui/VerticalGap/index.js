import { styler, withTypes } from '@/utils/html-class';
import styles from './verticalgap.module.scss';
const c = styler(styles);

const VerticalGap = ({ children, type = "lg" }) => {
  return <div className={c("container", ...withTypes(type))}>
    {children}
  </div>;
};

export default VerticalGap;
