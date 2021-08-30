# Jellies

![Jellies Logo](https://user-images.githubusercontent.com/2560088/70382313-91314180-1994-11ea-8ad3-6c97b1d0a283.png)

This project is a UI toolkit based on [ElementUI](https://github.com/ElemeFE/element) (v2.15.3). A full documentation will come out in a later version and if you would like to use it now you may refer to [a Chinese version](https://www.yuque.com/haoranyu/jellies) of temporary documentation.

## How to use

Install the Jellies via NPM.

```bash
npm install --save jellies
```

Import it to your project. And use it accordingly on your Vue instance.

### Import completely at once

If you only would like to try Jellies you may import it completely. However, it is not recommended for production since the whole package is quite large.

```javascript
import Jellies from "jellies";

// Some code related to Vue...

Vue.use(Jellies);
```

### On demand import

With the help of [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component), we can import components we actually need, making our project smaller than otherwise.

First, install `babel-plugin-component`:

```javascript
npm install babel-plugin-component -D
```

Then edit .babelrc:

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "jellies",
        "libDir": "src/components",
        "styleLibraryName": "theme"
      }
    ]
  ]
}
```

Next, if you need Button and Select, edit main.js:

```javascript
import Vue from "vue";
import { Button, Select } from "jellies";
import App from "./App.vue";

Vue.use(Button);
Vue.use(Select);

new Vue({
  el: "#app",
  render: h => h(App)
});
```

Full example

```javascript
import Vue from "vue";

import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  Tag,
  Tree,
  Alert,
  Slider,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Container,
  Header,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Backtop,
  Panel,
  Loading,
  Message,
  Notification
} from "jellies";

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Container);
Vue.use(Header);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Backtop);
Vue.use(Panel);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
```

Then you are able to use the functionality of Jellies in your project.

## For Developer

### Solve Dependency

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```
