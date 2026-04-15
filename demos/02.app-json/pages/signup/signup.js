const app = getApp();

Page({
  data: {
    activityId: null,
    activity: null,
    form: {
      name: '',
      major: '',
      contact: '',
      reason: ''
    },
    submitted: false
  },

  onLoad(options) {
    const activityId = parseInt(options.activityId);
    this.setData({ activityId });

    // 获取活动信息
    const activities = app.globalData.activities;
    const activity = activities.find(a => a.id === activityId);

    if (activity) {
      this.setData({ activity });
      wx.setNavigationBarTitle({
        title: `报名 - ${activity.name}`
      });
    }
  },

  // 处理表单输入
  handleInput(e) {
    const { field } = e.currentTarget.dataset;
    const form = this.data.form;
    form[field] = e.detail.value;
    this.setData({ form });
  },

  // 提交表单
  handleSubmit() {
    const { name, major, contact, reason } = this.data.form;

    // 验证字段
    if (!name || !major || !contact || !reason) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 验证联系方式格式
    if (!(/^\d{11}$|^[\w.-]+@[\w.-]+\.\w+$/.test(contact))) {
      wx.showToast({
        title: '请输入正确的手机号或邮箱',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 保存报名信息到本地存储
    const signups = wx.getStorageSync('signups') || [];
    const signup = {
      id: Date.now(),
      activityId: this.data.activityId,
      activityName: this.data.activity.name,
      name: name,
      major: major,
      contact: contact,
      reason: reason,
      signupTime: new Date().toLocaleString('zh-CN')
    };

    signups.push(signup);
    wx.setStorageSync('signups', signups);

    // 显示成功提示
    wx.showToast({
      title: '报名成功！',
      icon: 'success',
      duration: 2000
    });

    // 延迟后跳转到我的报名页面
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/my-signups/my-signups'
      });
    }, 2000);
  },

  // 返回
  handleBack() {
    wx.navigateBack();
  }
});
