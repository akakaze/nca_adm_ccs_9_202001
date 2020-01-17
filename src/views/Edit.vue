<template>
  <b-container>
    <div v-if="canPaste">
      <jumbotron-ctrl-v
        descriptions="3-15表單全選後複製貼上"
        @paste="paste"
        class="d-fixed"
      >
      </jumbotron-ctrl-v>
    </div>
    <div v-else>
      <listgroup-ctrl-c
        :copy-ready="copyReady"
        :copy-data="copyData"
        @copy="copy"
        ref="copyList"
      >
      </listgroup-ctrl-c>

      <b-btn variant="warning" @click="undo" v-show="copyReady" class="mt-3">
        返回
      </b-btn>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import JumbotronCtrlV from "@/components/JumbotronCtrlV.vue";
import ListgroupCtrlC from "@/components/ListgroupCtrlC.vue";
import Xlsx from "xlsx";

interface copyData {
  name: string;
  data: object;
}

export default Vue.extend({
  name: "edit",
  components: {
    JumbotronCtrlV,
    ListgroupCtrlC
  },
  data() {
    return {
      canPaste: true,
      orgLevel: ["處", "局", "隊", "司", "署", "委員會", "部", "院", "省政府"],
      copyListShow: false,
      copyReady: false,
      copyData: [] as copyData[]
    };
  },
  methods: {
    async paste(clipboard: Electron.Clipboard) {
      console.log("paste");
      try {
        let t = clipboard.readText();
        let array_org = this.organize(t);
        //array[][] => worksheet{A:B}
        let ws = Xlsx.utils.aoa_to_sheet(array_org);
        this.formatWorksheet(ws);
        this.copyData = [
          {
            name: "ODS (記得改頁首頁尾)",
            data: {
              html: this.toHtml(ws)
            }
          },
          {
            name: "ODT",
            data: {
              text: this.formatDocument(array_org)
            }
          }
        ];
      } catch (error) {
        this.$bvModal.msgBoxOk(error.message, {
          title: error.name,
          headerTextVariant: "white",
          headerBgVariant: "danger",
          bodyBgVariant: "danger",
          bodyTextVariant: "white",
          footerBgVariant: "danger",
          okVariant: "danger",
          headerClass: "border-bottom-0 pb-0",
          footerClass: "border-top-0 pt-0",
          centered: true
        });
        return;
      }
      this.canPaste = false;
      this.copyReady = false;
      this.copyListShow = true;
      setTimeout(() => {
        this.copyReady = true;
      }, 500);
    },
    undo() {
      this.canPaste = true;
    },
    toHtml(ws: Xlsx.WorkSheet) {
      return Xlsx.utils.sheet_to_html(ws);
    },
    organize(text: string) {
      console.info("organize");

      let array_org =
        //text => rows[]
        text
          .split("\n")
          .map(e => {
            let arr =
              //rows[] => cells[][]
              e
                .split("\t")
                //留下 B:C => A:B
                .slice(1, 3);
            arr[1] = arr[1] || arr[0];
            //轉成 string[] 準備刪除重複
            return JSON.stringify(arr);
          })
          //刪除重複
          .filter((itm, idx, arr) => arr.indexOf(itm) === idx)
          //轉回 cells[][]
          .map(str => JSON.parse(str));
      // console.log(array_org);
      return array_org;
    },
    formatWorksheet(ws: Xlsx.WorkSheet) {
      if (!ws["!merges"]) ws["!merges"] = [];
      if (ws["!ref"]) {
        const range = Xlsx.utils.decode_range(ws["!ref"]);
        let start_row = 0;
        let start_cell = ws.A1;
        for (let R = range.s.r; R <= range.e.r; R++) {
          //A 跨欄
          let cell_ref = Xlsx.utils.encode_cell({ c: 0, r: R + 1 });
          let cell = ws[cell_ref] || {};
          if (cell.v === start_cell.v) cell.v = "";
          else {
            if (R != start_row) {
              ws["!merges"].push({
                s: {
                  c: 0,
                  r: start_row
                },
                e: {
                  c: 0,
                  r: R
                }
              });
            }
            start_row = R + 1;
            start_cell = cell;
          }
        }
      }

      return ws;
    },
    //抓出通知機關
    //照單位層級排序
    //join "、"
    formatDocument(array_org: any[]) {
      let b = array_org
        .map(e => {
          if (e[0] === "內政部役政署") return e[1];
          return e[0];
        })
        .filter((itm, idx, arr) => arr.indexOf(itm) === idx);
      let bis = b.map((e, i) => {
        let ei = -1;
        for (let index = 0; index < this.orgLevel.length; index++) {
          const level = this.orgLevel[index];
          const el = e.slice(-level.length);
          ei = this.orgLevel.indexOf(el);
          if (ei != -1) break;
        }
        return {
          index: i,
          value: ei
        };
      });
      bis.sort((a, b) => b.value - a.value);
      let result = bis.map(e => b[e.index]);
      let nca_a = result.indexOf("替代役訓練班");
      let nca_b = result.indexOf("署本部");
      if (nca_a != -1) {
        result.splice(nca_a, 1);
        result.push("替代役訓練班");
      }
      if (nca_b != -1) {
        result.splice(nca_b, 1);
        result.push("本署人事室");
      }
      return result.join("、");
    },
    //複製來貼上
    copy(data: any, clipboard: Electron.Clipboard) {
      console.log("copy", data);

      clipboard.write(data);
    }
  }
});
</script>
