import { styler, toggle, withTypes } from '@/utils/html-class';
import styles from './horizontalgap.module.scss';
const c = styler(styles);

const HorizontalGap = ({ 
  children, 
  type = "lg", 
  mobileOnColumn = false, 
  align = "left",
  verticalCentered = false,
}) => {
  return <div className={c("container", ...withTypes(type), toggle(mobileOnColumn, "column"), ...withTypes(align), toggle(verticalCentered, "vertical-centered"))}>
    {children}
  </div>;
};

export default HorizontalGap; 