function filterTag(tag) {
  return tag.replace(/[^\w -]/g, "").trim().replace(/\W+/g, "-");
}

Vue.config.keyCodes.comma = 188;
Vue.component("tags", {
  template: "#tags-template",

  props: {
    suggest: {
      type: Array
    },
    maxTags: {
      type: Number,
      default: 0
    },
    maxTagLen: {
      type: Number,
      default: 0
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
      return !this.maxTags || this.maxTags > this.values.length;
    },
    suggestionOpen: function () {
      return this.open && this.suggestionsList && !!this.suggestionsList.length;
    },
    suggestionsList: function () {
      if (!this.suggest || !this.suggest.length) {
        return null;
      }
      return this.suggest.filter(function (s) {
        return s.toLowerCase().startsWith(this.newTag.toLowerCase()) && this.values.reduce(function (acc, val) {
          return acc && val.toLowerCase() !== filterTag(s).toLowerCase();
        }, true);
      }.bind(this));
    }
  },

  data: function() {
    return {
      newTag: "",
      open: false,
      active: 0
    };
  },

  methods: {
    remove: function(key) {
      this.values.splice(this.values.indexOf(key), 1);
      Vue.nextTick(function() {
        this.$refs.input.focus();
      }.bind(this));
    },

    add: function(_, suggestion) {
      if (!this.maxTags && this.maxTags.length <= this.values.length) {
        return;
      }
      var tag = filterTag(suggestion || this.newTag);
      if (tag && tag.length) {
        this.values.push(tag);
      }
      this.newTag = "";
    },

    handleEnter: function (e) {
      if (this.suggestionOpen && this.active !== -1) {
        e.preventDefault();
        this.add(e, this.suggestionsList[this.active]);
      } else {
        this.add();
      }
    },

    removeLast: function() {
      if (!this.newTag) {
        this.values.splice(this.values.length - 1, 1);
      }
    },

    doSuggest: function (open) {
      this.open = open;
    },

    setActive: function (index) {
      if (index < 0) {
        this.active = 0;
      } else if (index > this.suggestionsList.length - 1) {
        this.active = this.suggestionsList.length - 1;
      } else {
        this.active = index;
      }
    },

    removeActive: function () {
      this.active = -1;
    }
  }
});

new Vue({
  el: "#demo",
  data: {
    suggest: ["Fish", "Milk", "Chips"]
  }
});
