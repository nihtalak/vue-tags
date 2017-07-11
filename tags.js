function filterTag(tag) {
  return tag.replace(/[^\w -]/g, "").trim().replace(/\W+/g, "-");
}

Vue.component("tags", {
  template: "#tags-template",
  props: {
    values: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data: function() {
    return { newTag: this.newTag || "" };
  },
  methods: {
    remove: function(key) {
      this.values.splice(this.values.indexOf(key), 1);
    },
    add: function() {
      var tag = filterTag(this.newTag);
      if (tag && tag.length) {
        this.values.push(tag);
      }
      this.newTag = "";
    },
    removeLast: function() {
      if (!this.newTag) {
        this.values.splice(this.values.length - 1, 1);
      }
    }
  }
});

new Vue({ el: "#demo" });
