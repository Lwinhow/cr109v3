export const markerCamera = [
    {
        cood: [-1311929.6, 157387.65, 14.267177734375],
        name: 'security-01',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311836.16, 157302.30000000002, 14.75189453125],
        name: 'security-02',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311772.48, 157330.12, 15.064951171875],
        name: 'security-03',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311720, 157309.69, 15.477216796875],
        name: 'security-04',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311350.72, 157816.35, 12.847216796875001],
        name: 'security-06',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311559.04, 157778.96, 9.7237744140625],
        name: 'security-07',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311576.16, 157779.34, 8.8676171875],
        name: 'security-08',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311668.16, 157768.87, 12.574111328125],
        name: 'security-09',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311766.08, 157468.42, 17.106796875],
        name: 'security-10',
        image: 'm001.png',
        id: 2401,
    },

    {
        cood: [-1311629.44, 157444.76, 2.1100781250000002],
        name: 'safety-01',
        image: 'm001.png',
        id: 1801,
    },
    {
        cood: [-1311650.72, 157622.63, 14.7632421875],
        name: 'safety-03',
        image: 'm001.png',
        id: 601,
    },
    {
        cood: [-1311617.76, 157742.51, 13.7436328125],
        name: 'safety-05',
        image: 'm001.png',
        id: 1601,
    },
    {
        cood: [-1311747.52, 157428.44, 14.990390625],
        name: 'safety-06',
        image: 'm001.png',
        id: 1701,
    },
    {
        cood: [-1311705.12, 157302.99, 27.7718359375],
        name: 'safety-07',
        image: 'm001.png',
        id: 2201,
    },
    {
        cood: [-1311401.12, 157656.63, 9.7462109375],
        name: 'safety-09',
        image: 'm001.png',
        id: 2301,
    },
    {
        cood: [-1311514.08, 157542.67, 0.361015625],
        name: 'safety-10',
        image: 'm001.png',
        id: 401,
    },

    {
        cood: [-1311683.84, 157367.82, -5.326484375],
        name: 'IPdome',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311682.24, 157353.54, 10.2598046875],
        name: 'TBM2-Surface',
        image: 'm001.png',
        id: 4001,
    },
    {
        cood: [-1311728.32, 157455.17, 15.00375],
        name: 'LP1',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311659.04, 157562.94, 14.672656250000001],
        name: 'LP4',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311662.8800000001, 157592.89, 15.480625],
        name: 'TND-04',
        image: 'm001.png',
        id: 701,
    },
    {
        cood: [-1311493.92, 157679.44, 7.0566210937500005],
        name: 'LP2',
        image: 'm001.png',
        id: null,
    },
    {
        cood: [-1311429.92, 157766.97, -6.6218994140625],
        name: 'TBM2-Bottom',
        image: 'm001.png',
        id: 3001,
    },
    {
        cood: [-1311414.8800000001, 157759.13, -10.403623046875],
        name: 'TBM1-Bottom',
        image: 'm001.png',
        id: 5001,
    },
    {
        cood: [-1311371.2, 157754.78, 10.25466796875],
        name: 'Site-Office',
        image: 'm001.png',
        id: 6001,
    },
    {
        cood: [-1311404.48, 157777.01, -6.1598315429687505],
        name: 'TBM-Disant',
        image: 'm001.png',
        id: 8001,
    },

    {
        cood: [-1311829.76, 157392.2, 15.8066845703125],
        name: 'FR-01',
        image: 'm001.png',
        id: 2501,
    },
    {
        cood: [-1311827.2, 157383.71, 16.799375],
        name: 'FR-02',
        image: 'm001.png',
        id: 2601,
    },
    {
        cood: [-1311809.92, 157387.48, 19.189429931640625],
        name: 'ENT',
        image: 'm001.png',
        id: 101,
    },
    {
        cood: [-1311822.08, 157376.79, 19.010323486328126],
        name: 'EXT',
        image: 'm001.png',
        id: 201,
    },
    {
        cood: [-1311803.68, 157381.13, 19.137783203125],
        name: 'Inspection',
        image: 'm001.png',
        id: 801,
    },
]

export const addMarkerCamera = async () => {
    __g.marker.clear()
    const path = window.location.origin;
    let arr = []
    for (let i = 0; i < markerCamera.length; i++) {
        const marker = {
            id: 'MCamera' + i,
            groupId: 'JK',
            userData: i + "",
            coordinate: markerCamera[i].cood, //坐标位置
            coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
            anchors: [-16, 32], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准
            imageSize: [48, 48], //图片的尺寸
            hoverImageSize: [48, 48], //鼠标悬停时显示的图片尺寸
            range: [1, 100000], //可视范围
            textRange: [1, 200],
            text: markerCamera[i].name,
            fontSize: 12,
            textBackgroundColor: [1, 1, 1, 0],
            fontColor: '#c71e1e',
            imagePath: path + '/marker/' + markerCamera[i].image, //显示图片路径
            hoverImagePath: path + '/marker/' + markerCamera[i].image, //显示图片路径
            fixedSize: true, //图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false
            useTextAnimation: true, //关闭文字展开动画效果 打开会影响效率
            showLine: false, //标注点下方是否显示垂直牵引线
            autoHidePopupWindow: true, //失去焦点后是否自动关闭弹出窗口
            autoHeight: false, // 自动判断下方是否有物体
            displayMode: 2,
            clusterByImage: false, // 聚合时是否根据图片路径分类，即当多个marker的imagePath路
            priority: 0, //避让优先级
            occlusionCull: false //是否参与遮挡剔
        }
        arr.push(marker)
    }
    console.log(1)
    await __g.marker.add(arr);
}