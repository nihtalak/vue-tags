function filterTag(tag) {
  return tag.replace(/[^\w -]/g, "").trim().replace(/\W+/g, "-");
}

Vue.component("tags", {
  template: "#tags-template",
  props: {
    maxTags: {
      type: Number,
      default: -1
    },
    maxTagLen: {
      type: Number,
      default: -1
    },
    values: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    value: function() {
      return this.values.join(",");
    },
    showInput: function() {
      return this.maxTags === -1 || this.maxTags > this.values.length;
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
      if (this.maxTags.length <= this.values.length) {
        return;
      }
      var tag = filterTag(this.newTag);
      if (tag && tag.length) {
        this.values.push(tag);
      }
      this.newTag = "";
    },
    addPrevent: function(e) {
      e.preventDefault();
      this.add();
    },
    removeLast: function() {
      if (!this.newTag) {
        this.values.splice(this.values.length - 1, 1);
      }
    }
  }
});

new Vue({ el: "#demo" });
