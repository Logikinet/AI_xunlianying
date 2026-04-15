const app = getApp();

Page({
  data: {
    activity: null,
    activityId: null
  },

  onLoad(options) {
    const activityId = parseInt(options.id);
    this.setData({ activityId });

    // 从全局数据中获取对应活动的详情
    const activities = app.globalData.activities;
    const activity = activities.find(a => a.id === activityId);

    if (activity) {
      this.setData({ activity });
      wx.setNavigationBarTitle({
        title: activity.name
      });
    }
  },

  // 点击立即报名按钮
  handleSignup() {
    if (!this.data.activity) return;

    wx.navigateTo({
      url: `/pages/signup/signup?activityId=${this.data.activityId}`
    });
  }
});
