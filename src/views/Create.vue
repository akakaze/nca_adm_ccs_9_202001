<template>
  <b-container>
    <input-month
      description="例行上製作三個月後的月初要退的名單"
      :month-after="3"
      ref="productMonth"
    >
    </input-month>

    <create-from-template
      dir-path="P:\提醒需要機關待退役男\"
      placeholder="[ yyy-mm ]"
      ref="createTarget"
    >
    </create-from-template>

    <b-btn variant="primary" @click="create" class="mt-3">
      建檔
    </b-btn>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import InputMonth from "@/components/InputMonth.vue";
import CreateFromTemplate from "@/components/CreateFromTemplate.vue";
import fs, { promises as fsp } from "fs";

export default Vue.extend({
  name: "create",
  components: {
    InputMonth,
    CreateFromTemplate
  },
  methods: {
    async create() {
      const productMonth = this.$refs.createTarget as HTMLFormElement;
      const createTarget = this.$refs.createTarget as HTMLFormElement;
      try {
        const dir = createTarget.getDir();
        if (!dir) {
          createTarget.promptFalse();
          throw new Error("未選擇資料夾");
        }

        const yyy = productMonth.yyy;
        const mm = productMonth.mm;
        const f_ods = `${dir.path}\\${yyy}年${mm}月份退役需用機關暨服勤單位退役役男名冊.ods`;
        const f_odt = `${dir.path}\\${yyy}年${mm}月份退役需用機關退役役男名冊.odt`;
        const t_ods = `src\\assets\\template\\template.ods`;
        const t_odt = `src\\assets\\template\\template.odt`;
        const es = [f_ods, f_odt].filter(async f => {
          const fe = await fsp.stat(f);
          return fe.isFile();
        });
        if (es.length !== 0) {
          const h = this.$createElement;
          const vnode = h("div", [
            h("p", "無法建檔：已有相同的檔案名稱"),
            h(
              "ul",
              es.map(e => h("li", e))
            )
          ]);
          createTarget.promptFalse();

          throw {
            message: vnode,
            name: "錯誤"
          };
        } else {
          await Promise.all([
            fsp.copyFile(t_ods, f_ods, fs.constants.COPYFILE_EXCL),
            fsp.copyFile(t_odt, f_odt, fs.constants.COPYFILE_EXCL)
          ]);
          fs.chmodSync(f_ods, 0o775);
          fs.chmodSync(f_odt, 0o775);
          createTarget.promptTrue();
          await this.$bvModal.msgBoxOk("請進行下一步", {
            title: "成功建立",
            headerBgVariant: "success",
            okVariant: "success",
            buttonSize: "sm",
            headerClass: "border-bottom-0",
            footerClass: "border-top-0",
            centered: true
          });
        }
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
      }
    }
  }
});
</script>
