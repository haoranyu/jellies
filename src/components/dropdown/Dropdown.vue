<script>
import { Dropdown } from 'element-ui';
const DropdownWrapper = Dropdown;
DropdownWrapper.name = 'JskDropdown';
DropdownWrapper.props = {
  dropdownTrigger: {
    type: String,
    default: 'hover'
  },
  dropdownType: String,
  dropdownSize: {
    type: String,
    default: ''
  },
  dropdownShowTimeout: {
    type: Number,
    default: 250
  },
  dropdownHideTimeout: {
    type: Number,
    default: 150
  },
  dropdownTabindex: {
    type: Number,
    default: 0
  },
  dropdownPlacement: {
    type: String,
    default: 'bottom-end'
  },
  isSplitButton: Boolean,
  isItemClickCollapsible: {
    type: Boolean,
    default: true
  },
  isArrowVisible: {
    default: true
  }
};
DropdownWrapper.computed = {
  trigger: function() {
    return this.dropdownTrigger;
  },
  type: function() {
    return this.dropdownType;
  },
  size: function() {
    return this.dropdownSize;
  },
  dropdownMenuSize: function() {
    return this.dropdownSize;
  },
  splitButton: function() {
    return this.isSplitButton;
  },
  hideOnClick: function() {
    return this.isItemClickCollapsible;
  },
  placement: function() {
    return this.dropdownPlacement;
  },
  visibleArrow: function() {
    return this.isArrowVisible;
  },
  showTimeout: function() {
    return this.dropdownShowTimeout;
  },
  hideTimeout: function() {
    return this.dropdownHideTimeout;
  },
  tabindex: function() {
    return this.dropdownTabindex;
  }
};
export default DropdownWrapper;
</script>
