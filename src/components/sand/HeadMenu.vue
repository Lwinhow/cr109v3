<template>
  <div>
    <div class="head-btn">
      <div class="head-panle">
        <div class="head-panle-ct-l">
          <i class="sunny" @click="sunny"></i>
          <i class="rainy" @click="rain(0.2, 0.2)"></i>
          <i class="snowy" @click="snow(0.2, 0)"></i>
          <i class="foggy" @click="fog(0.5, 0.5, 50)"></i>
        </div>
        <div class="head-panle-ct-r">
          <i class="freeView" @click="changeViewMode(0)"></i>
          <!--          <i class="manView" @click="changeViewMode(1)"></i>-->
          <i class="flyView" @click="changeViewMode(2)"></i>
          <i class="mapView" @click="changeViewMode(4)"></i>
          <i class="reView" @click="backToHomePage"></i>
          <!--          <i class="backHome" @click="backToHomePage"></i>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadMenu",
  components: {},
  data() {
    return {
      btnN: ['Overview', 'Alarm', 'Apply'],
      routeN: ['alarm', 'apply'],
    };
  },
  methods: {
    backToHomePage() {
      this.changeViewMode(0)
      __g.camera.set([-1311493.58875, 157033.471719, 574.008711, -45.003574, -99.802147, 3])
      __g.marker.clear()
      __g.customObject.clear()
      __g.camera.stopAnimation()
      __g.tools.stopPlaneClip();
      __g.tools.stopVolumeClip();
      __g.infoTree.hide([
        'F6ABC22442B91B5EF7C740BAE23991BA',//商场模型
        '734A66D94AA5D43840FF8DB6CD3EF00E',//结构模型
        '2FBB0F894CFD2ECF697760A7DCA61969',//项目模型
        '349280C44403CF4FA47257999931BEF5',//工程走向
        'C010BA13489E0704A9415B8B10B9671B',//漫游配置
        'F0CD9D044374CF7D5CE36A9EF14A61E5',//漫游配置
        '32861C9A4457CC78A01B3E8BEC224D76',//漫游配置
        '6433422F4DEC29AE77FE98BD968309AA',//漫游配置
        'C384DB1C41C1AD0E2219D68BA931D25E',//漫游配置
      ])
      __g.infoTree.show([
        '9561C9FE4B3F953060DA20993729C110',//在建模型
        'F762F9024430C36142D448BDFAF4B0FF',//倾斜摄影
        '26A2E41640223B909F3EAF8C3E11880C',//周边建筑
        '3D7E4151485286E3184AF0A15B35C988',//地形
        '3D378F6140734B6EA6DA10AF135E47C5',//检测模型
        'F1085241443B54131403E6B50778A59B',//在建隧道
        '9561C9FE4B3F953060DA20993729C110',//隧道2
      ])
      // __g.tileLayer.hideActors({
      //   id: 'C2265D4D4B81DEC1F9DC95896C06B293',
      //   objectIds: [
      //     '3mV$bRpMjGjht$IScT9Dpb',
      //     '134JEIq4YG4im5bKeqZ3pJ',
      //   ]
      // })
      // __g.tileLayer.hideActors({
      //   id: '2D855E3A4C80CF5CA34F4393DAC4C049',
      //   objectIds: [
      //     '1b2LVM2n49_sCqbWJHFhS$',
      //     '0mtLUR_lqO6dSzIpY61rEU',
      //   ]
      // })
      __g.tileLayer.hideActors({
        id: '37A846BB400BB416C7E7E3983F2A5844',
        objectIds: [
          '155kZdrNL6AvS9JsGdEQD4',
          '155kZdrNL6AvS9JsGdEQD7',
          '155kZdrNL6AvS9JsGdEQD9',
          '155kZdrNL6AvS9JsGdEQD8',
          '155kZdrNL6AvS9JsGdEQDm',
          '155kZdrNL6AvS9JsGdEQDp',
          '155kZdrNL6AvS9JsGdEQDd',
          '155kZdrNL6AvS9JsGdEQDc',
          '155kZdrNL6AvS9JsGdEQDg',
          '155kZdrNL6AvS9JsGdEQIL',
          '155kZdrNL6AvS9JsGdEQIV',
          '155kZdrNL6AvS9JsGdEQIU',
          '155kZdrNL6AvS9JsGdEQIY',
          '155kZdrNL6AvS9JsGdEQIj',
          '3FQHZ745v0nRHNuL81MJpx',
          '3FQHZ745v0nRHNuL81MJpy',
          '3FQHZ745v0nRHNuL81MJdk',
          '3FQHZ745v0nRHNuL81MJdl',
          '3FQHZ745v0nRHNuL81MJcI',
          '3FQHZ745v0nRHNuL81MJcJ',
          '3FQHZ745v0nRHNuL81MJc6',
          '3FQHZ745v0nRHNuL81MJc7',
          '1YPnTiFCDA9B$BLjtbT74j',
          '1YPnTiFCDA9B$BLjtbT74Z',
          '1YPnTiFCDA9B$BLjtbT74m',
          '1YPnTiFCDA9B$BLjtbT74s',
          '1YPnTiFCDA9B$BLjtbT747',
          '1YPnTiFCDA9B$BLjtbT745',
          '1YPnTiFCDA9B$BLjtbT75g',
          '1YPnTiFCDA9B$BLjtbT75e',
          '1YPnTiFCDA9B$BLjtbT75$',
          '1YPnTiFCDA9B$BLjtbT75z',
          '1YPnTiFCDA9B$BLjtbT752',
          '1YPnTiFCDA9B$BLjtbT750',
          '1YPnTiFCDA9B$BLjtbT75H',
          '1YPnTiFCDA9B$BLjtbT75N',
          '00kBH4Rrn7JAArBcQwM1V4',
          '00kBH4Rrn7JAArBcQwM1VA',
          '00kBH4Rrn7JAArBcQwM1Uv',
          '00kBH4Rrn7JAArBcQwM1U$',
          '00kBH4Rrn7JAArBcQwM1Uk',
          '00kBH4Rrn7JAArBcQwM1Ui',
          '00kBH4Rrn7JAArBcQwM1U7',
          '00kBH4Rrn7JAArBcQwM1U5',
          '00kBH4Rrn7JAArBcQwM1Tw',
          '00kBH4Rrn7JAArBcQwM1Tu',
          '00kBH4Rrn7JAArBcQwM1TH',
          '00kBH4Rrn7JAArBcQwM1TN',
          '00kBH4Rrn7JAArBcQwM1T8',
          '00kBH4Rrn7JAArBcQwM1TE',
          '00kBH4Rrn7JAArBcQwM1Sy_RN',
          '00kBH4Rrn7JAArBcQwM1SY',
          '00kBH4Rrn7JAArBcQwM6ZD',
          '00kBH4Rrn7JAArBcQwM6Yp',
          '1F3CvCjNr8RBu2CqU7sP8o',
          '1F3CvCjNr8RBu2CqU7sP8m',
          '1F3CvCjNr8RBu2CqU7sPF5',
          '1F3CvCjNr8RBu2CqU7sPFR',
          '1F3CvCjNr8RBu2CqU7sPFk',
          '1F3CvCjNr8RBu2CqU7sPFi',
          '1F3CvCjNr8RBu2CqU7sPFm',
          '1F3CvCjNr8RBu2CqU7sPFs',
          '1F3CvCjNr8RBu2CqU7sP3V',
          '1F3CvCjNr8RBu2CqU7sP3T',
          '1xf4GVaRn0RvReoam42$8F',
          '1xf4GVaRn0RvReoam42$89',
          '1xf4GVaRn0RvReoam42$8M',
          '1xf4GVaRn0RvReoam42$8G',
          '1xf4GVaRn0RvReoam42$8Z_RN',
          '1xf4GVaRn0RvReoam42$8z',
          '1xf4GVaRn0RvReoam42$7E',
          '1xf4GVaRn0RvReoam42$78',
          '1xf4GVaRn0RvReoam42$7L',
          '1xf4GVaRn0RvReoam42$7N',
          '1xf4GVaRn0RvReoam42$7Y_RN',
          '1xf4GVaRn0RvReoam42$7y',
          '1xf4GVaRn0RvReoam42$6F',
          '1xf4GVaRn0RvReoam42$69',
          '1xf4GVaRn0RvReoam42$6M',
          '1xf4GVaRn0RvReoam42$6G',
          '1xf4GVaRn0RvReoam42$6r',
          '1xf4GVaRn0RvReoam42$6t',
          '2K9Mu3NMD4TBZUzEj4bMDG',
          '2K9Mu3NMD4TBZUzEj4bMDM',
          '2K9Mu3NMD4TBZUzEj4bMDK',
          '2K9Mu3NMD4TBZUzEj4bMDQ_RN',
          '2K9Mu3NMD4TBZUzEj4bMDO_RN',
          '2K9Mu3NMD4TBZUzEj4bMDU',
          '2K9Mu3NMD4TBZUzEj4bMDS',
          '2K9Mu3NMD4TBZUzEj4bMD2',
          '2K9Mu3NMD4TBZUzEj4bNGb',
          '2K9Mu3NMD4TBZUzEj4bNGh',
          '2K9Mu3NMD4TBZUzEj4bMr2',
          '2K9Mu3NMD4TBZUzEj4bMr0',
          '2K9Mu3NMD4TBZUzEj4bNGf',
          '2K9Mu3NMD4TBZUzEj4bNGl',
          '2K9Mu3NMD4TBZUzEj4bNGj',
          '2K9Mu3NMD4TBZUzEj4bNJJ',
          '2K9Mu3NMD4TBZUzEj4bNJV',
          '2K9Mu3NMD4TBZUzEj4bNJT',

          '0sz9L2W994Iwh4dFR171UA',
          '3U90S6ovHEDvqNbDFlaWXD',
          '1ZRa5rRrb7c9_kg_QHXtYV',
          '3CIRTrhLr2OgeEVowrB0FJ',
          '0fG0yQFA9FcAVEtPZL2Yvv',
          '04UwbgsHv5khlcT_7ELdKo',
          '2zs1xw1Jf0MucBZrpgMa42',
          '0sz9L2W994Iwh4dFR171UD_RN',
          '21U7DkRvX7SPYmS8cyClSI',
          '0sz9L2W994Iwh4dFR171U7',
          '1zkYEkDOX8bRbA3QW6Cmss',
          '3U90S6ovHEDvqNbDFlaWcD',
          '0sz9L2W994Iwh4dFR171Un',
          '1sA4OKQMz8mwtFIqYwF4io',
          '0sz9L2W994Iwh4dFR171Uu',
          '0sz9L2W994Iwh4dFR171Uq',
          '0sz9L2W994Iwh4dFR170XC',
          '0sz9L2W994Iwh4dFR171Sj',
          '0sz9L2W994Iwh4dFR171TU',
          '0sz9L2W994Iwh4dFR171TL',
          '0sz9L2W994Iwh4dFR171Ts',
          '0sz9L2W994Iwh4dFR171UK',
          '0sz9L2W994Iwh4dFR171UJ',
          '0sz9L2W994Iwh4dFR171Th',
          '0sz9L2W994Iwh4dFR171Uy',
          '0sz9L2W994Iwh4dFR171Ud',
          '0sz9L2W994Iwh4dFR170rB',
          '0sz9L2W994Iwh4dFR170Jn',
          '0sz9L2W994Iwh4dFR171TE',

          '0sz9L2W994Iwh4dFR171Nw',
          '0sz9L2W994Iwh4dFR171ND',
          '0sz9L2W994Iwh4dFR171Nt',
          '0sz9L2W994Iwh4dFR1714Q',
          '0sz9L2W994Iwh4dFR170xE',
          '0sz9L2W994Iwh4dFR170wz',
          '0sz9L2W994Iwh4dFR170wB',
          '0sz9L2W994Iwh4dFR170wH',
          '0sz9L2W994Iwh4dFR171H_',
          '0sz9L2W994Iwh4dFR171Hd',
          '0sz9L2W994Iwh4dFR171He',
          '0sz9L2W994Iwh4dFR171IP',
          '0sz9L2W994Iwh4dFR171LS',
          '1Xqx9LrTv6$A2lld3co40N',
          '0sz9L2W994Iwh4dFR1715Z',
          '0sz9L2W994Iwh4dFR171Iq',
          '1Xqx9LrTv6$A2lld3co4xB',
          '0sz9L2W994Iwh4dFR170I6',
          '2E7SgHKrv02v_aFgtbh53V',
          '0sz9L2W994Iwh4dFR171Jt',
          '0sz9L2W994Iwh4dFR171IX',
          '0i$$A$A613QQvmqeaJ8NI$',
          '0sz9L2W994Iwh4dFR171Jp',
          '3WVZzAPyf3OO6$tU8h6lkz',
          '2uw1RPx7H0ZBYuRNqVSBbK',
          '1AG3BOnkj8WAgJpXOT2UTz',
          '1OTOYVD7b919uKMIBcLB6p',
          '1OTOYVD7b919uKMIBcLB8m',
          '0c2x53$HH7UOEI1tovym_W',
          '3_uAOEkfT4WeIeT2AdYbC8',
          '3_uAOEkfT4WeIeT2AdYbAA',
          '0sz9L2W994Iwh4dFR171JF',
          '0sz9L2W994Iwh4dFR171J1',

          '3FQHZ745v0nRHNuL81MJpu',
          '3FQHZ745v0nRHNuL81MJpd',
          '3m0Xun4Lv8ReAhc_j3bzD6',
          '3m0Xun4Lv8ReAhc_j3bz2I',
          '1F3CvCjNr8RBu2CqU7sP35',
          '1F3CvCjNr8RBu2CqU7sPO0',
          '1F3CvCjNr8RBu2CqU7sP37',
          '1xf4GVaRn0RvReoam42$Oe',
          '1xf4GVaRn0RvReoam42$Og',
          '1xf4GVaRn0RvReoam42$Mb',
          '2K9Mu3NMD4TBZUzEj4bNHb',
          '2K9Mu3NMD4TBZUzEj4bNHl',
          '2K9Mu3NMD4TBZUzEj4bNVw',
          '2K9Mu3NMD4TBZUzEj4bMAG',
          '2K9Mu3NMD4TBZUzEj4bMAM',
          '3DxbkRl6jEce_D7ryz2BGx',
          '3DxbkRl6jEce_D7ryz2BT1',
          '1xf4GVaRn0RvReoam42$EC',
          '1xf4GVaRn0RvReoam42$Fo',
          '1xf4GVaRn0RvReoam42$Cn',
          '1xf4GVaRn0RvReoam42$Ct',
          '1F3CvCjNr8RBu2CqU7sP99',
          '1xf4GVaRn0RvReoam42$Cb',
          '1F3CvCjNr8RBu2CqU7sP3R',
          '1F3CvCjNr8RBu2CqU7sPLb',
          '1YPnTiFCDA9B$BLjtbT7AH',
          '1YPnTiFCDA9B$BLjtbT79R',
          '3FQHZ745v0nRHNuL81MJpw',
          '3FQHZ745v0nRHNuL81MJpv',
        ]
      })
      __g.customObject.addByTileLayer({
        id: 'zjmx1',
        tileLayerId: '37A846BB400BB416C7E7E3983F2A5844',
        objectId: [
          '155kZdrNL6AvS9JsGdEQD4',
          '155kZdrNL6AvS9JsGdEQD7',
          '155kZdrNL6AvS9JsGdEQD9',
          '155kZdrNL6AvS9JsGdEQD8',
          '155kZdrNL6AvS9JsGdEQDm',
          '155kZdrNL6AvS9JsGdEQDp',
          '155kZdrNL6AvS9JsGdEQDd',
          '155kZdrNL6AvS9JsGdEQDc',
          '155kZdrNL6AvS9JsGdEQDg',
          '155kZdrNL6AvS9JsGdEQIL',
          '155kZdrNL6AvS9JsGdEQIV',
          '155kZdrNL6AvS9JsGdEQIU',
          '155kZdrNL6AvS9JsGdEQIY',
          '155kZdrNL6AvS9JsGdEQIj',
          '3FQHZ745v0nRHNuL81MJpx',
          '3FQHZ745v0nRHNuL81MJpy',
          '3FQHZ745v0nRHNuL81MJdk',
          '3FQHZ745v0nRHNuL81MJdl',
          '3FQHZ745v0nRHNuL81MJcI',
          '3FQHZ745v0nRHNuL81MJcJ',
          '3FQHZ745v0nRHNuL81MJc6',
          '3FQHZ745v0nRHNuL81MJc7',
          '1YPnTiFCDA9B$BLjtbT74j',
          '1YPnTiFCDA9B$BLjtbT74Z',
          '1YPnTiFCDA9B$BLjtbT74m',
          '1YPnTiFCDA9B$BLjtbT74s',
          '1YPnTiFCDA9B$BLjtbT747',
          '1YPnTiFCDA9B$BLjtbT745',
          '1YPnTiFCDA9B$BLjtbT75g',
          '1YPnTiFCDA9B$BLjtbT75e',
          '1YPnTiFCDA9B$BLjtbT75$',
          '1YPnTiFCDA9B$BLjtbT75z',
          '1YPnTiFCDA9B$BLjtbT752',
          '1YPnTiFCDA9B$BLjtbT750',
          '1YPnTiFCDA9B$BLjtbT75H',
          '1YPnTiFCDA9B$BLjtbT75N',
          '00kBH4Rrn7JAArBcQwM1V4',
          '00kBH4Rrn7JAArBcQwM1VA',
          '00kBH4Rrn7JAArBcQwM1Uv',
          '00kBH4Rrn7JAArBcQwM1U$',
          '00kBH4Rrn7JAArBcQwM1Uk',
          '00kBH4Rrn7JAArBcQwM1Ui',
          '00kBH4Rrn7JAArBcQwM1U7',
          '00kBH4Rrn7JAArBcQwM1U5',
          '00kBH4Rrn7JAArBcQwM1Tw',
          '00kBH4Rrn7JAArBcQwM1Tu',
          '00kBH4Rrn7JAArBcQwM1TH',
          '00kBH4Rrn7JAArBcQwM1TN',
          '00kBH4Rrn7JAArBcQwM1T8',
          '00kBH4Rrn7JAArBcQwM1TE',
          '00kBH4Rrn7JAArBcQwM1Sy_RN',
          '00kBH4Rrn7JAArBcQwM1SY',
          '00kBH4Rrn7JAArBcQwM6ZD',
          '00kBH4Rrn7JAArBcQwM6Yp',
          '1F3CvCjNr8RBu2CqU7sP8o',
          '1F3CvCjNr8RBu2CqU7sP8m',
          '1F3CvCjNr8RBu2CqU7sPF5',
          '1F3CvCjNr8RBu2CqU7sPFR',
          '1F3CvCjNr8RBu2CqU7sPFk',
          '1F3CvCjNr8RBu2CqU7sPFi',
          '1F3CvCjNr8RBu2CqU7sPFm',
          '1F3CvCjNr8RBu2CqU7sPFs',
          '1F3CvCjNr8RBu2CqU7sP3V',
          '1F3CvCjNr8RBu2CqU7sP3T',
          '1xf4GVaRn0RvReoam42$8F',
          '1xf4GVaRn0RvReoam42$89',
          '1xf4GVaRn0RvReoam42$8M',
          '1xf4GVaRn0RvReoam42$8G',
          '1xf4GVaRn0RvReoam42$8Z_RN',
          '1xf4GVaRn0RvReoam42$8z',
          '1xf4GVaRn0RvReoam42$7E',
          '1xf4GVaRn0RvReoam42$78',
          '1xf4GVaRn0RvReoam42$7L',
          '1xf4GVaRn0RvReoam42$7N',
          '1xf4GVaRn0RvReoam42$7Y_RN',
          '1xf4GVaRn0RvReoam42$7y',
          '1xf4GVaRn0RvReoam42$6F',
          '1xf4GVaRn0RvReoam42$69',
          '1xf4GVaRn0RvReoam42$6M',
          '1xf4GVaRn0RvReoam42$6G',
          '1xf4GVaRn0RvReoam42$6r',
          '1xf4GVaRn0RvReoam42$6t',
          '2K9Mu3NMD4TBZUzEj4bMDG',
          '2K9Mu3NMD4TBZUzEj4bMDM',
          '2K9Mu3NMD4TBZUzEj4bMDK',
          '2K9Mu3NMD4TBZUzEj4bMDQ_RN',
          '2K9Mu3NMD4TBZUzEj4bMDO_RN',
          '2K9Mu3NMD4TBZUzEj4bMDU',
          '2K9Mu3NMD4TBZUzEj4bMDS',
          '2K9Mu3NMD4TBZUzEj4bMD2',
          '2K9Mu3NMD4TBZUzEj4bNGb',
          '2K9Mu3NMD4TBZUzEj4bNGh',
          '2K9Mu3NMD4TBZUzEj4bMr2',
          '2K9Mu3NMD4TBZUzEj4bMr0',
          '2K9Mu3NMD4TBZUzEj4bNGf',
          '2K9Mu3NMD4TBZUzEj4bNGl',
          '2K9Mu3NMD4TBZUzEj4bNGj',
          '2K9Mu3NMD4TBZUzEj4bNJJ',
          '2K9Mu3NMD4TBZUzEj4bNJV',
          '2K9Mu3NMD4TBZUzEj4bNJT',
        ],
        location: [],
        coordinateType: 0,
      })
      __g.customObject.addByTileLayer({
        id: 'zjmx2',
        tileLayerId: '37A846BB400BB416C7E7E3983F2A5844',
        objectId: [
          '0sz9L2W994Iwh4dFR171UA',
          '3U90S6ovHEDvqNbDFlaWXD',
          '1ZRa5rRrb7c9_kg_QHXtYV',
          '3CIRTrhLr2OgeEVowrB0FJ',
          '0fG0yQFA9FcAVEtPZL2Yvv',
          '04UwbgsHv5khlcT_7ELdKo',
          '2zs1xw1Jf0MucBZrpgMa42',
          '0sz9L2W994Iwh4dFR171UD_RN',
          '21U7DkRvX7SPYmS8cyClSI',
          '0sz9L2W994Iwh4dFR171U7',
          '1zkYEkDOX8bRbA3QW6Cmss',
          '3U90S6ovHEDvqNbDFlaWcD',
          '0sz9L2W994Iwh4dFR171Un',
          '1sA4OKQMz8mwtFIqYwF4io',
          '0sz9L2W994Iwh4dFR171Uu',
          '0sz9L2W994Iwh4dFR171Uq',
          '0sz9L2W994Iwh4dFR170XC',
          '0sz9L2W994Iwh4dFR171Sj',
          '0sz9L2W994Iwh4dFR171TU',
          '0sz9L2W994Iwh4dFR171TL',
          '0sz9L2W994Iwh4dFR171Ts',
          '0sz9L2W994Iwh4dFR171UK',
          '0sz9L2W994Iwh4dFR171UJ',
          '0sz9L2W994Iwh4dFR171Th',
          '0sz9L2W994Iwh4dFR171Uy',
          '0sz9L2W994Iwh4dFR171Ud',
          '0sz9L2W994Iwh4dFR170rB',
          '0sz9L2W994Iwh4dFR170Jn',
          '0sz9L2W994Iwh4dFR171TE',

          '0sz9L2W994Iwh4dFR171Nw',
          '0sz9L2W994Iwh4dFR171ND',
          '0sz9L2W994Iwh4dFR171Nt',
          '0sz9L2W994Iwh4dFR1714Q',
          '0sz9L2W994Iwh4dFR170xE',
          '0sz9L2W994Iwh4dFR170wz',
          '0sz9L2W994Iwh4dFR170wB',
          '0sz9L2W994Iwh4dFR170wH',
          '0sz9L2W994Iwh4dFR171H_',
          '0sz9L2W994Iwh4dFR171Hd',
          '0sz9L2W994Iwh4dFR171He',
          '0sz9L2W994Iwh4dFR171IP',
          '0sz9L2W994Iwh4dFR171LS',
          '1Xqx9LrTv6$A2lld3co40N',
          '0sz9L2W994Iwh4dFR1715Z',
          '0sz9L2W994Iwh4dFR171Iq',
          '1Xqx9LrTv6$A2lld3co4xB',
          '0sz9L2W994Iwh4dFR170I6',
          '2E7SgHKrv02v_aFgtbh53V',
          '0sz9L2W994Iwh4dFR171Jt',
          '0sz9L2W994Iwh4dFR171IX',
          '0i$$A$A613QQvmqeaJ8NI$',
          '0sz9L2W994Iwh4dFR171Jp',
          '3WVZzAPyf3OO6$tU8h6lkz',
          '2uw1RPx7H0ZBYuRNqVSBbK',
          '1AG3BOnkj8WAgJpXOT2UTz',
          '1OTOYVD7b919uKMIBcLB6p',
          '1OTOYVD7b919uKMIBcLB8m',
          '0c2x53$HH7UOEI1tovym_W',
          '3_uAOEkfT4WeIeT2AdYbC8',
          '3_uAOEkfT4WeIeT2AdYbAA',
          '0sz9L2W994Iwh4dFR171JF',
          '0sz9L2W994Iwh4dFR171J1',
        ],
        location: [],
        coordinateType: 0,
      })
      __g.customObject.addByTileLayer({
        id: 'zjmx3',
        tileLayerId: '37A846BB400BB416C7E7E3983F2A5844',
        objectId: [
          '3FQHZ745v0nRHNuL81MJpu',
          '3FQHZ745v0nRHNuL81MJpd',
          '3m0Xun4Lv8ReAhc_j3bzD6',
          '3m0Xun4Lv8ReAhc_j3bz2I',
          '1F3CvCjNr8RBu2CqU7sP35',
          '1F3CvCjNr8RBu2CqU7sPO0',
          '1F3CvCjNr8RBu2CqU7sP37',
          '1xf4GVaRn0RvReoam42$Oe',
          '1xf4GVaRn0RvReoam42$Og',
          '1xf4GVaRn0RvReoam42$Mb',
          '2K9Mu3NMD4TBZUzEj4bNHb',
          '2K9Mu3NMD4TBZUzEj4bNHl',
          '2K9Mu3NMD4TBZUzEj4bNVw',
          '2K9Mu3NMD4TBZUzEj4bMAG',
          '2K9Mu3NMD4TBZUzEj4bMAM',
          '3DxbkRl6jEce_D7ryz2BGx',
          '3DxbkRl6jEce_D7ryz2BT1',
          '1xf4GVaRn0RvReoam42$EC',
          '1xf4GVaRn0RvReoam42$Fo',
          '1xf4GVaRn0RvReoam42$Cn',
          '1xf4GVaRn0RvReoam42$Ct',
          '1F3CvCjNr8RBu2CqU7sP99',
          '1xf4GVaRn0RvReoam42$Cb',
          '1F3CvCjNr8RBu2CqU7sP3R',
          '1F3CvCjNr8RBu2CqU7sPLb',
          '1YPnTiFCDA9B$BLjtbT7AH',
          '1YPnTiFCDA9B$BLjtbT79R',
          '3FQHZ745v0nRHNuL81MJpw',
          '3FQHZ745v0nRHNuL81MJpv',
        ],
        location: [],
        coordinateType: 0,
      })
      __g.customObject.setTintColor('zjmx1', '#c71e1e')
      __g.customObject.setTintColor('zjmx2', '#f8c605')
      __g.customObject.setTintColor('zjmx3', '#9a8e8e')
    },
    changeViewMode(index) {
      __g.settings.setInteractiveMode(index)
      __g.camera.stopAnimation()
      __g.tools.stopPlaneClip();
      __g.tools.stopVolumeClip();
    },
    //天气
    setWeather(weather) {
      switch (true) {
        case weather.includes("雾"):
          this.whichFog(weather)
          break;
        case weather.includes("雨"):
          this.whichRain(weather)
          break;
        case weather.includes("雪"):
          this.whichSnow(weather)
          break;
        case weather.includes("晴"):
          console.log("晴")
          this.sunny()
          break;
        case weather.includes("风"):
          console.log("风")
          this.windy()
          break;
        default:
          console.log("???")
          this.normalWeather()
          break;
      }
    },
    whichFog(weather) {
      this.isRainOrSnow()
      switch (weather) {
        case "轻雾":
          console.log("轻雾")
          this.fog(0.5, 0.5, 50)
          break;
        case "大雾":
          console.log("大雾")
          this.fog(1, 0.45, 50)
          break;
        case "浓雾":
          console.log("浓雾")
          this.fog(1.5, 0.4, 30)
          break;
        case "强雾":
          console.log("强雾")
          this.fog(2, 0.35, 10)
          break;
        default:
          console.log("???")
          this.fog(0.75, 0.5, 75)
          break;
      }
    },
    whichRain(weather) {
      switch (weather) {
        case "小雨":
          console.log("小雨")
          this.rain(0.2, 0.2)
          break;
        case "中雨":
          console.log("中雨")
          this.rain(0.5, 0.2)
          break;
        case "大雨":
          console.log("大雨")
          this.rain(0.8, 0.2)
          break;
        case "暴雨":
          console.log("暴雨")
          this.rain(1, 0.5)
          break;
        default:
          console.log("???")
          this.rain(0.4, 0.2)
          break;
      }
    },
    whichSnow(weather) {
      switch (weather) {
        case "小雪":
          console.log("小雪")
          this.snow(0.2, 0)
          break;
        case "中雪":
          console.log("中雪")
          this.snow(0.4, 0.2)
          break;
        case "大雪":
          console.log("大雪")
          this.snow(0.7, 0.3)
          break;
        default:
          console.log("???")
          this.snow(0.3, 0.1)
          break;
      }
    },
    setAmbientLight(intensity) {
      __g.weather.setAmbientLightIntensity(intensity)
    },
    setCloud(density, thickness, height) {
      __g.weather.setCloudDensity(density)
      __g.weather.setCloudThickness(thickness)
      __g.weather.setCloudHeight(height)
    },
    setSun(intensity, size, temperature) {
      __g.weather.setSunIntensity(intensity)
      __g.weather.setSunSize(size)
      __g.weather.setTemperature(temperature)
    },
    fog(fogDensity, fogHeightFalloff, fogStartDistance) {
      this.isRainOrSnow()
      let fogColor = [1, 1, 1, 0]
      let fogOpacity = 1
      __g.weather.setFogParam(fogDensity, fogColor, fogHeightFalloff, fogStartDistance, fogOpacity)
    },
    rain(strength, speed) {
      __g.weather.setFogParam(0, [1, 1, 1, 0], 0, 10000, 0)
      let raindropSize = 0.5;
      let rainColor = [0.5, 0.5, 0.5, 0.1]
      let alignCamera = 0.1
      let overcastStrength = 0.5
      __g.weather.setRainParam(strength, speed, raindropSize, rainColor, alignCamera, overcastStrength)
    },
    snow(strength, snowflakeSize) {
      __g.weather.setFogParam(0, [1, 1, 1, 0], 0, 10000, 0)
      let speed = 0
      let snowColor = [1, 1, 1, 1]
      let alignCamera = 0.1
      __g.weather.setSnowParam(strength, speed, snowflakeSize, snowColor, alignCamera)
    },
    sunny() {
      this.isRainOrSnow()
      __g.weather.setFogParam(0, [1, 1, 1, 0], 0, 10000, 0)
      this.setAmbientLight(2)
      this.setCloud(0.5, 0.3, 5)
      this.setSun(10, 2, 5500)
    },
    windy() {
      this.isRainOrSnow()
      __g.weather.setFogParam(0, [1, 1, 1, 0], 0, 10000, 0)
      this.setAmbientLight(2)
      this.setCloud(1, 0.5, 15)
      this.setSun(7, 1, 5500)
    },
    normalWeather() {
      this.isRainOrSnow()
      __g.weather.setFogParam(0, [1, 1, 1, 0], 0, 10000, 0)
      this.setAmbientLight(1)
      this.setCloud(1, 0.4, 10)
      this.setSun(5, 1, 5500)
    },
    isRainOrSnow() {
      let data = {}
      __g.weather.getParams().then(
          (result) => {
            data = result;
          }
      )
      if (data.rainsnow !== 0) {
        __g.weather.disableRainSnow()
      }
    },
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.head-btn {
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  height: 70px;
  text-align: center;
  overflow: hidden;

  .head-panle-ct-l {
    position: absolute;
    left: 25px;
    top: 0;
    width: 220px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sunny {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/sunny.png') center center no-repeat;
      background-size: 90% 90%
    }

    .rainy {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/rain.png') center center no-repeat;
      background-size: 90% 90%
    }

    .snowy {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/snow.png') center center no-repeat;
      background-size: 80% 80%
    }

    .foggy {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/fog2.png') center center no-repeat;
      background-size: 80% 80%
    }
  }

  .head-panle-ct-r {
    position: absolute;
    right: 25px;
    top: 0;
    width: 220px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .freeView {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/sand-freeView.png') center center no-repeat;
      background-size: 85% 85%
    }

    .manView {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/sand-manView.png') center center no-repeat;
      background-size: 80% 80%
    }

    .flyView {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/sand-uav.png') center center no-repeat;
      background-size: 70% 70%
    }

    .mapView {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/sand-compass.png') center center no-repeat;
      background-size: 70% 70%
    }

    .reView {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/sand-refresh.png') center center no-repeat;
      background-size: 70% 70%
    }

    .backHome {
      width: 50px;
      height: 50px;
      background: url('@/assets/screenimages/sand-return.png') center center no-repeat;
      background-size: 75% 75%
    }
  }

  .head-panle-ct-m {
    display: inline-block;
    height: 100%;
    text-align: center;
    opacity: 1;

    font-family: Source Han Sans;
    font-size: 28px;
    font-weight: bold;
    line-height: 50px;
    letter-spacing: 0.15em;
    background: linear-gradient(180deg, #FFFFFF 34%, #7BBCE6 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  i {
    color: rgba(34, 114, 217, 0.65);
  }

  #sun:hover {
    color: #e72525;
  }

  #showers:hover {
    color: #57bee0;
  }

  #snowy:hover {
    color: #ffffff;
  }

  #foggy:hover {
    color: #726868;
  }

  #loop:hover {
    color: #f8c0c0;
  }

  #back:hover {
    color: #33ff4f;
  }
}
</style>