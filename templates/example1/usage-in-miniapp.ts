/* eslint-disable no-undef */
/// <reference path="../../node_modules/@tiki.vn/tini-types/types/global.d.ts"/>
/// <reference path="./output/comon-types.d.ts"/>
/// <reference path="./output/jsapis/my-request.d.ts"/>

interface Userdata {
  username: string,
  id: number
}

Page({
  onLoad () {
    my.request<Userdata>({
      url: 'user.domain',
      success: async (payload) => {
        await Promise.resolve() // example: do user's stuff;

        console.log(payload.data.id)
      }
    })
  }
})
