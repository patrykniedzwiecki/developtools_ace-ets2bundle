/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.source = `
@Component
struct CustomContainer {
  header: string = "";
  @BuilderParam content: () => void;
  @BuilderParam callContent: any;
  footer: string = "";
  build() {
    Column() {
      Text(this.header)
      this.content()
      this.callContent()
      Text(this.footer)
    }
  }
}

@Component
struct CustomContainer2 {
  header: string = "";
  @BuilderParam content: () => void;
  build() {
    Column() {
      Text(this.header)
      this.content()
    }
  }
}

@Entry
@Component
struct CustomContainerUser {
  @State text: string = 'header'
  @Builder specificParam() {
    Column() {
      Text("content").fontSize(50)
    }
  }
  @Builder callSpecificParam(label1: string, label2: string) {
    Column() {
      Text(label1).fontSize(50)
      Text(label2).fontSize(50)
    }
  }

  build() {
    Column() {
      Row(){
        CustomContainer({
          header: this.text,
          content: this.specificParam,
          callContent: this.callSpecificParam("callContent1", 'callContent2'),
          footer: "Footer",
        })
      }
      Row(){
        CustomContainer2({
          header: this.text,
        }){
          Column(){
            this.callSpecificParam("111", '222')
          }.onClick(()=>{
            this.text = "changeHeader"
          })
        }
      }
    }
  }
}
`
exports.expectResult =
`class CustomContainer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params) {
        super(compilerAssignedUniqueChildId, parent);
        this.header = "";
        this.footer = "";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params) {
        if (params.header !== undefined) {
            this.header = params.header;
        }
        this.content = params.content;
        this.callContent = params.callContent;
        if (params.footer !== undefined) {
            this.footer = params.footer;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Text.create(this.header);
        Text.pop();
        this.content();
        this.callContent();
        Text.create(this.footer);
        Text.pop();
        Column.pop();
    }
}
class CustomContainer2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params) {
        super(compilerAssignedUniqueChildId, parent);
        this.header = "";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params) {
        if (params.header !== undefined) {
            this.header = params.header;
        }
        this.content = params.content;
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Text.create(this.header);
        Text.pop();
        this.content();
        Column.pop();
    }
}
class CustomContainerUser extends View {
    constructor(compilerAssignedUniqueChildId, parent, params) {
        super(compilerAssignedUniqueChildId, parent);
        this.__text = new ObservedPropertySimple('header', this, "text");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    get text() {
        return this.__text.get();
    }
    set text(newValue) {
        this.__text.set(newValue);
    }
    specificParam() {
        Column.create();
        Text.create("content");
        Text.fontSize(50);
        Text.pop();
        Column.pop();
    }
    callSpecificParam(label1, label2) {
        Column.create();
        Text.create(label1);
        Text.fontSize(50);
        Text.pop();
        Text.create(label2);
        Text.fontSize(50);
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Row.create();
        let earlierCreatedChild_2 = this.findChildById("2");
        if (earlierCreatedChild_2 == undefined) {
            View.create(new CustomContainer("2", this, {
                header: this.text,
                content: this.specificParam,
                callContent: this.callSpecificParam("callContent1", 'callContent2'),
                footer: "Footer",
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                header: this.text,
                content: this.specificParam,
                callContent: this.callSpecificParam("callContent1", 'callContent2'),
                footer: "Footer"
            });
            View.create(earlierCreatedChild_2);
        }
        Row.pop();
        Row.create();
        let earlierCreatedChild_3 = this.findChildById("3");
        if (earlierCreatedChild_3 == undefined) {
            View.create(new CustomContainer2("3", this, {
                header: this.text,
                content: () => {
                    Column.create();
                    Column.onClick(() => {
                        this.text = "changeHeader";
                    });
                    this.callSpecificParam("111", '222');
                    Column.pop();
                }
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                header: this.text,
                content: () => {
                    Column.create();
                    Column.onClick(() => {
                        this.text = "changeHeader";
                    });
                    this.callSpecificParam("111", '222');
                    Column.pop();
                }
            });
            View.create(earlierCreatedChild_3);
        }
        Row.pop();
        Column.pop();
    }
}
loadDocument(new CustomContainerUser("1", undefined, {}));
`
