Page({
  data: {
    intro: "校园活动报名助手是一个为学生社团、校园组织打造的活动管理平台。通过本应用，您可以轻松了解校园内的各项活动，快速报名参加感兴趣的活动，与同学们共同参与丰富多彩的校园生活。",
    activities: []
  },

  onLoad() {
    // 从全局数据中获取活动列表
    const app = getApp();
    this.setData({
      activities: app.globalData.activities
    });
  },

  // 进入活动详情页
  handleActivityTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${id}`
    });
  }
});