var contact = {
  ageConfirm: function (event) {
    var index = event.currentTarget.dataset.index;
    var btnDisabled = this.data.btnDisabled;
    btnDisabled[this.data.ageIndex] = false;
    btnDisabled[index] = true;
    this.setData({
      ageIndex: index,
      btnDisabled: btnDisabled
    });
  },

  initClass: function () {
    var btnDisabled = [];
    for (var index = 0; index < this.data.age.length; index++) {
      btnDisabled.push(false);
    }
    btnDisabled[this.data.ageIndex] = true;
    this.setData({ btnDisabled: btnDisabled });
  }
};

export default contact;