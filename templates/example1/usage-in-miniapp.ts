interface Userdata {
  username: string,
  id: number
}

Page({
  onLoad() {
    my.request<Userdata>({
      url: "user.domain",
      success: async (payload) => {
        await Promise.resolve(); // example: do user's stuff;

        console.log(payload.data.id)
      }
    })
  }
})