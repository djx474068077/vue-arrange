<template>
  <div>
    <div>
      <textarea rows="3" cols="120" v-model="ipt_str" placeholder="请输入需要组合的所有内容..."></textarea>
    </div>
    <div style="margin: 10px 0;">
      <select name="num" v-model="num">
        <option :value="2">2</option>
        <option :value="3">3</option>
        <option :value="4">4</option>
      </select>
      <button @click="submit">确定</button>
    </div>
    <div>
      <textarea rows="10" cols="120" v-model="opt_str" ></textarea>
    </div>
    <div style="margin: 10px 0;">
      <span>总{{ opt_len }}个</span>
      <!--<button @click="exportTable">导出excel</button>-->
      <JsonExcel class = "export-excel"
                 :title = 'json_title'
                 :data = "json_data"
                 :fields = "json_fields"
                 worksheet = "My Worksheet"
                 name = "组合.xls"
      >导出excel</JsonExcel>
    </div>
  </div>
</template>

<script>
  import JsonExcel from 'vue-json-excel';
export default {
  name: 'HelloWorld',
  components: {JsonExcel},
  data() {
    return {
      num: 2,
      ipt_str: '',
      opt_arr: '',
      opt_str: '',
      opt_len: 0,
      json_title: '',
      json_fields: {},
      json_data: [],
    }
  },
  methods: {
    submit() {
      this.opt_str = '';
      this.json_fields = {};
      this.json_data = [];
      let reg = /[^(a-zA-Z0-9\u4e00-\u9fa5)]/g;
      let ipt_arr = Array.from(new Set(this.ipt_str.replace(reg, "").split(''))); // 去重
      this.opt_arr = this.makeUp(ipt_arr, this.num);
      this.opt_str = this.opt_arr.join('；');
      this.opt_len = this.opt_arr.length;
      setTimeout(() => {
        this.afterMakeUp();
      }, 300)
    },

    // 组合
    makeUp(arr, num) {
      let out_arr = [];
      arr.map((value_a) => {
        arr.map((value_b) => {
          if (num == 2) {
            if (value_a != value_b) {
              out_arr.push(value_a + value_b)
            }
          } else {
            arr.map((value_c) => {
              if (num == 3) {
                if (value_a != value_b && value_a != value_c && value_b != value_c) {
                  out_arr.push(value_a + value_b + value_c)
                }
              } else {
                arr.map((value_d) => {
                  if (num == 4) {
                    if (value_a != value_b && value_a != value_c && value_b != value_c && value_a != value_d && value_b != value_d && value_c != value_d) {
                      out_arr.push(value_a + value_b + value_c + value_d)
                    }
                  } else {
                    alert('暂未实现，敬请期待');
                  }
                })
              }
            })
          }
        })
      })
      return out_arr;
    },

    afterMakeUp(){
      console.log('afterMakeUp');
      let key_word = ''; // 当前遍历到的首字母
      let first_key = ''; // 首字母（固定值）
      let no_index = 0;
      this.opt_arr.map((value, i) => {
        let key = value.split('')[0];
        if (i == 0) {
          first_key = key;
        }
        if (key_word !== key) {
          no_index = 0;
          this.json_fields[key] = key;
        }
        if (first_key == key) {
          this.json_data.push({[key] : value});
        } else {
          this.json_data[no_index][key] = value;
          no_index ++;
        }
        key_word = key;
      });
      this.json_title = this.ipt_str;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  border-radius: 4px;
  padding: 6px;
  font-size: 15px;
}
  select {
    width: 70px;
    height: 30px;
  }
  button {
    height: 30px;
    padding: 0 24px;
    border-radius: 4px;
    outline: none;
    border: none;
    margin-left: 20px;
    background-color: #2d8cf0;
    color: #fff;
    font-size: 16px;
  }
  .export-excel{
    display: inline-block;
    height: 30px;
    padding: 0 24px;
    border-radius: 4px;
    outline: none;
    border: none;
    margin-left: 20px;
    background-color: #2d8cf0;
    color: #fff;
    font-size: 16px;
    line-height: 30px;
    cursor: pointer;
  }
</style>
