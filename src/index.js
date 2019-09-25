import Vue from 'vue'
import Element from 'element-ui'
import './plugins/element-variables.scss'
import './plugins/jellies-icons/style.scss'
import './plugins/jellies-icons/replace.scss'

import Alert from './components/alert'
import Avatar from './components/avatar'
import Backtop from './components/backtop'
import Badge from './components/badge'
import Breadcrumb from './components/breadcrumb'
import BreadcrumbItem from './components/breadcrumb-item'
import Button from './components/button'
import ButtonGroup from './components/button-group'
import Card from './components/card'
import Carousel from './components/carousel'
import CarouselItem from './components/carousel-item'
import Cascader from './components/cascader'
import Checkbox from './components/checkbox'
import CheckboxButton from './components/checkbox-button'
import CheckboxGroup from './components/checkbox-group'
import Col from './components/col'
import Collapse from './components/collapse'
import CollapseItem from './components/collapse-item'
import ColorPicker from './components/color-picker'
import Container from './components/container'
import DatePicker from './components/date-picker'
import Dialog from './components/dialog'
import Divider from './components/divider'
import Drawer from './components/drawer'
import Dropdown from './components/dropdown'
import DropdownItem from './components/dropdown-item'
import DropdownMenu from './components/dropdown-menu'
import Form from './components/form'
import FormItem from './components/form-item'
import Header from './components/header'
import Image from './components/image'
import Input from './components/input'
import InputNumber from './components/input-number'
import Link from './components/link'
import MenuItem from './components/menu-item'
import MenuItemGroup from './components/menu-item-group'
import Modal from './components/modal'
import Option from './components/option'
import OptionGroup from './components/option-group'
import Pagination from './components/pagination'
import Panel from './components/panel'
import Popover from './components/popover'
import Price from './components/price'
import Progress from './components/progress'
import Radio from './components/radio'
import RadioButton from './components/radio-button'
import RadioGroup from './components/radio-group'
import Rate from './components/rate'
import Row from './components/row'
import Select from './components/select'
import SideMenu from './components/side-menu'
import Slider from './components/slider'
import Splitpanes from './components/splitpanes'
import Step from './components/step'
import Steps from './components/steps'
import Submenu from './components/submenu'
import Switch from './components/switch'
import Table from './components/table'
import TableColumn from './components/table-column'
import Tag from './components/tag'
import Text from './components/text'
import TimePicker from './components/time-picker'
import TimeSelect from './components/time-select'
import Timeline from './components/timeline'
import TimelineItem from './components/timeline-item'
import Tooltip from './components/tooltip'
import Topnav from './components/topnav'
import Tree from './components/tree'
import Upload from './components/upload'

Vue.use(Element)

const components = [
  Alert,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  Container,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Header,
  Image,
  Input,
  InputNumber,
  Link,
  MenuItem,
  MenuItemGroup,
  Modal,
  Option,
  OptionGroup,
  Pagination,
  Panel,
  Popover,
  Price,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Select,
  SideMenu,
  Slider,
  Splitpanes,
  Step,
  Steps,
  Submenu,
  Switch,
  Table,
  TableColumn,
  Tag,
  Text,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Tooltip,
  Topnav,
  Tree,
  Upload
];

const install = function(Vue, opts = {}) {
  if (install.installed) return;

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };
};

export default {
  version: '1.0.0',
  install,
  Alert,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  Container,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Header,
  Image,
  Input,
  InputNumber,
  Link,
  MenuItem,
  MenuItemGroup,
  Modal,
  Option,
  OptionGroup,
  Pagination,
  Panel,
  Popover,
  Price,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Select,
  SideMenu,
  Slider,
  Splitpanes,
  Step,
  Steps,
  Submenu,
  Switch,
  Table,
  TableColumn,
  Tag,
  Text,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Tooltip,
  Topnav,
  Tree,
  Upload
}
