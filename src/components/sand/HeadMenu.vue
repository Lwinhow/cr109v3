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
    },
    changeViewMode(index) {
      __g.settings.setInteractiveMode(index)
      __g.camera.stopAnimation()
      __g.tools.stopPlaneClip();
      __g.tools.stopVolumeClip();
      __g.infoTree.hide([
        'F6ABC22442B91B5EF7C740BAE23991BA',//商场模型
        'FBE4932F4A31B2BEE5955B835E017551',//结构模型
        '2FBB0F894CFD2ECF697760A7DCA61969',//项目模型
        '349280C44403CF4FA47257999931BEF5',//工程走向
      ])
      __g.infoTree.show([
        '9561C9FE4B3F953060DA20993729C110',//在建
        'F762F9024430C36142D448BDFAF4B0FF',//倾斜摄影
        '26A2E41640223B909F3EAF8C3E11880C',
        '3D7E4151485286E3184AF0A15B35C988',
        '3D378F6140734B6EA6DA10AF135E47C5',
        'F1085241443B54131403E6B50778A59B',
      ])
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