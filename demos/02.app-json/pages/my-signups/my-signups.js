Page({
  data: {
    signups: [],
    isEmpty: true
  },

  onLoad() {
    this.loadSignups();
  },

  // 每次切换到该页面时重新加载数据
  onShow() {
    this.loadSignups();
  },

  // 加载报名信息
  loadSignups() {
    const signups = wx.getStorageSync('signups') || [];
    this.setData({
      signups: signups,
      isEmpty: signups.length === 0
    });
  },

  // 删除报名信息
  handleDelete(e) {
    const { id } = e.currentTarget.dataset;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除这条报名记录吗？',
      success: (res) => {
        if (res.confirm) {
          let signups = wx.getStorageSync('signups') || [];
          signups = signups.filter(s => s.id !== id);
          wx.setStorageSync('signups', signups);
          
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500
          });

          this.loadSignups();
        }
      }
    });
  },

  // 查看详情
  handleView(e) {
    const { activityId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${activityId}`
    });
  }
});
