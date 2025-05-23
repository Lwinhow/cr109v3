!function () {
    if (!window.WebVideoCtrl) {
        var e = function () {
            var e = {
                    szversion: "V3.3.8 build20241012",
                    szContainerID: "",
                    szColorProperty: "",
                    szBasePath: "",
                    iWndowType: 1,
                    bWndFull: !0,
                    iPackageType: 2,
                    bDebugMode: !0,
                    cbSelWnd: null,
                    cbDoubleClickWnd: null,
                    cbEvent: null,
                    cbInitPluginComplete: null,
                    iTopHeight: 0
                }, n = null, r = 0, i = !1, o = [], s = [], a = null, d = null, c = this, u = null, l = "IPCamera",
                p = "IPDome", h = "IPZoom";

            function f(e, t, n) {
                try {
                    var r = "<div>" + dateFormat(new Date, "yyyy-MM-dd hh:mm:ss") + " " + e;
                    if (void 0 !== t && 200 != t) {
                        var i = $(n).find("statusString").eq(0).text(), o = $(n).find("subStatusCode").eq(0).text();
                        r += "" === o ? "" === o && "" === i ? "(" + t + ")" : "(" + t + ", " + i + ")" : "(" + t + ", " + o + ")"
                    }
                    r += "</div>", $("#opinfo").html(r + $("#opinfo").html())
                } catch (e) {
                }
            }

            const I = function (e, t) {
                let n = -1;
                return function () {
                    clearTimeout(n), n = setTimeout(e, t)
                }
            }((async () => {
                P()
            }), 80);
            window.addEventListener("scroll", (function () {
                if (null !== n) {
                    var t = $("#" + e.szContainerID);
                    n.JS_Resize(t.width(), t.height())
                }
                I()
            }));
            const P = () => {
                let t = $("#" + e.szContainerID), n = window.innerWidth || document.documentElement.clientWidth,
                    r = window.innerHeight || document.documentElement.clientHeight;
                if (!t.length || !t.get(0)) return !1;
                let i = t.get(0).getBoundingClientRect(), o = e.iTopHeight || 0;
                const s = window.innerWidth - document.documentElement.clientWidth;
                let a = Math.max(0 - i.left, 0), d = Math.max(o - i.top, 0), c = Math.max(i.right - (n - s), 0),
                    u = Math.max(i.bottom - r, 0), l = t.width(), p = t.height();
                a = Math.min(a, l), d = Math.min(d, p), c = Math.min(c, l), u = Math.min(u, p), a >= l || d >= p || c >= l || u >= p ? this.I_HidPlugin() : this.I_ShowPlugin(), m("left", Math.round(a)), m("top", Math.round(d)), m("right", Math.round(c)), m("bottom", Math.round(u))
            }, m = async (e, t) => (console.log(e, t), n.JS_SetWndCover(e, t));
            var g = {errorCode: 2e3, errorMsg: "The device is not login."},
                S = {errorCode: 1e3, errorMsg: "Unknown error."}, y = {errorCode: 1002, errorMsg: "Params error."},
                v = function (e) {
                    return new Promise((function (t, n) {
                        let r = e.oProtocolInc.getDeviceInfo(e, {}), i = e.oProtocolInc.getAnalogChannelInfo(e, {}),
                            o = e.oProtocolInc.getAudioInfo(e, {}), s = T(e),
                            a = e.oProtocolInc.getDeviceMinusLocalTime(e);
                        Promise.all([r, i, o, s, a]).then((() => {
                            t()
                        }), (() => {
                            t()
                        }))
                    }))
                }, x = function (t) {
                    return new Promise((function (i, o) {
                        if (r = 0, d.isUndefined(t) || (e.szContainerID = t), null != document.getElementById(e.szContainerID)) {
                            var s = {
                                szId: t,
                                aIframe: e.aIframe,
                                bEmbed: !!e.aIframe,
                                iType: 1,
                                iWidth: "100%",
                                iHeight: "100%",
                                iMaxSplit: 4,
                                iCurrentSplit: e.iWndowType,
                                iServicePortStart: 34200,
                                iServicePortEnd: 34209,
                                oSessionInfo: {
                                    sessionID: "11c12b3257f037bb50052db3ac5e342572c3d963622baca122755c482ce8823a",
                                    user: "admin",
                                    challenge: "275816f02ec2dca22b6a6ae87c7cb7e3",
                                    iterations: 100,
                                    random: "34765058"
                                },
                                iPluginType: 2,
                                onConnectSuccess: r => {
                                    if (console.log("uuid", r), r) {
                                        let e = document.title, t = `${" ".repeat(40)}\r_`;
                                        if (e.indexOf("_") > -1) {
                                            let n = e.split("_")[0].replace(/[\u00A0\u000D]/g, "");
                                            document.title = n + t + r
                                        } else document.title = e + t + r
                                    }
                                    var s = $("#" + t);
                                    if (n.JS_Resize(s.width(), s.height()), 2 === n.iPluginMode) {
                                        var a = e.bWndFull ? 1 : 0;
                                        n.JS_SetFullScreenCapability(a), n.JS_SetPackageType(e.iPackageType), C(), new Promise((function (e, t) {
                                            n.JS_GetLocalConfig().then((t => {
                                                u = t, e()
                                            }), (() => {
                                                t()
                                            }))
                                        })).then((() => {
                                            i()
                                        }))
                                    } else o({errorCode: 3e3, errorMsg: "Plugin init failed."})
                                },
                                onConnectError: () => {
                                    o({errorCode: 3e3, errorMsg: "Plugin init failed."})
                                },
                                szBasePath: d.getDirName()
                            };
                            console.log("这个是标配插件"), n = new JSVideoPlugin(s)
                        } else o(y)
                    }))
                }, C = function () {
                    n.JS_SetWindowControlCallback({
                        onGetSelectWndInfo: t => {
                            !function (t) {
                                if (r = t, e.cbSelWnd) {
                                    var n = [];
                                    n.push("<RealPlayInfo>"), n.push("<SelectWnd>" + r + "</SelectWnd>"), n.push("</RealPlayInfo>"), e.cbSelWnd(d.loadXML(n.join("")))
                                }
                            }(t)
                        }, onPluginEventHandler: (t, n, r) => {
                            !function (t, n, r) {
                                var i = 1e3;
                                0 === n ? i = 3002 : 2 === n ? i = 3003 : 3 === n ? i = 5e3 : 21 === n && (i = 3004), 3002 == i || 3003 == i ? c.I_Stop(t) : 3004 == i ? c.I_StopRecord(t) : 5e3 == i && c.I_StopVoiceTalk(), e.cbEvent && e.cbEvent(i, t, r)
                            }(t, n, r)
                        }, KeyBoardEvent: t => {
                            100 === parseInt(t, 10) && (i = !1, e.cbDoubleClickWnd && e.cbDoubleClickWnd(r, i))
                        }, onMouseEvent: function (t) {
                            !function (t) {
                                e.cbDoubleClickWnd && 2 === t.eventType && (e.bWndFull && -1 != c.findWndIndexByIndex(t.wndIndex) && (i = !i), e.cbDoubleClickWnd(t.wndIndex, i))
                            }(t)
                        }
                    })
                }, T = function (e) {
                    return new Promise((async (t, n) => {
                        var r = null;
                        if (await M(e)) r = await D(e); else {
                            for (var i = await _(e), o = !1, s = 0; s < i.length; s++) if (i[s].ipv4 == e.szIP || i[s].ipv6 == e.szIP) {
                                o = !0;
                                break
                            }
                            (o || -1 == (r = await w(e)).iRtspPort && -1 == r.iDevicePort) && (r = await D(e))
                        }
                        e.iRtspPort = r.iRtspPort, e.iHttpPort = r.iHttpPort, t(r)
                    }))
                }, D = function (e) {
                    return new Promise(((n, r) => {
                        var i = -1, o = -1, s = -1;
                        e.oProtocolInc.getPortInfo(e, {
                            async: !1, success: function (e) {
                                var r = t.$XML(e).find("AdminAccessProtocol", !0);
                                i = 554;
                                for (var a = 0, d = r.length; a < d; a++) "rtsp" === t.$XML(r).eq(a).find("protocol").eq(0).text().toLowerCase() && (i = parseInt(t.$XML(r).eq(a).find("portNo").eq(0).text(), 10)), "http" === t.$XML(r).eq(a).find("protocol").eq(0).text().toLowerCase() && (o = parseInt(t.$XML(r).eq(a).find("portNo").eq(0).text(), 10)), ("dev_manage" === t.$XML(r).eq(a).find("protocol").eq(0).text().toLowerCase() || "sdk" === t.$XML(r).eq(a).find("protocol").eq(0).text().toLowerCase()) && (s = parseInt(t.$XML(r).eq(a).find("portNo").eq(0).text(), 10));
                                n({iRtspPort: i, iHttpPort: o, iDevicePort: s})
                            }, error: function () {
                                n({iRtspPort: -1, iHttpPort: -1, iDevicePort: -1})
                            }
                        })
                    }))
                }, w = function (e) {
                    return new Promise(((n, r) => {
                        var i = -1, o = -1, s = -1;
                        e.oProtocolInc.getUPnPPortStatus(e, {
                            async: !1, success: function (e) {
                                for (var r = t.$XML(e).find("portStatus", !0), a = 0, d = r.length; a < d; a++) "rtsp" == t.$XML(r).eq(a).find("internalPort").eq(0).text().toLowerCase() && (i = parseInt(t.$XML(r).eq(a).find("externalPort").eq(0).text(), 10)), "http" == t.$XML(r).eq(a).find("internalPort").eq(0).text().toLowerCase() && (o = parseInt(t.$XML(r).eq(a).find("externalPort").eq(0).text(), 10)), "admin" == t.$XML(r).eq(a).find("internalPort").eq(0).text().toLowerCase() && (s = parseInt(t.$XML(r).eq(a).find("externalPort").eq(0).text(), 10));
                                n({iRtspPort: i, iHttpPort: o, iDevicePort: s})
                            }, error: function () {
                                n({iRtspPort: -1, iHttpPort: -1, iDevicePort: -1})
                            }
                        })
                    }))
                }, _ = function (e) {
                    return new Promise((function (n) {
                        var r = [];
                        e.oProtocolInc.getNetworkBond(e, {
                            async: !1, success: function (i) {
                                "true" == t.$XML(i).find("enabled").eq(0).text() ? (r.push({
                                    ipv4: t.$XML(i).find("ipAddress").eq(0).text(),
                                    ipv6: t.$XML(i).find("ipv6Address").eq(0).text()
                                }), n(r)) : e.oProtocolInc.getNetworkInterface(e, {
                                    async: !1, success: function (e) {
                                        for (var i = 0, o = t.$XML(e).find("NetworkInterface", !0).length; i < o; i++) {
                                            r.push({
                                                ipv4: t.$XML(e).find("ipAddress").eq(0).text(),
                                                ipv6: t.$XML(e).find("ipv6Address").eq(0).text()
                                            });
                                            break
                                        }
                                        n(r)
                                    }, error: function () {
                                        n(r)
                                    }
                                })
                            }, error: function () {
                                e.oProtocolInc.getNetworkInterface(e, {
                                    async: !1, success: function (e) {
                                        for (var i = 0, o = t.$XML(e).find("NetworkInterface", !0).length; i < o; i++) {
                                            r.push({
                                                ipv4: t.$XML(e).find("ipAddress").eq(0).text(),
                                                ipv6: t.$XML(e).find("ipv6Address").eq(0).text()
                                            });
                                            break
                                        }
                                        n(r)
                                    }, error: function () {
                                        n(r)
                                    }
                                })
                            }
                        })
                    }))
                }, M = function (e) {
                    return new Promise((function (n) {
                        var r = !1;
                        e.oProtocolInc.getPPPoEStatus(e, {
                            success: function (e) {
                                r = t.$XML(e).find("ipAddress", !0).length > 0 || t.$XML(e).find("ipv6Address", !0).length > 0, n(r)
                            }, error: function () {
                                n(r = !1)
                            }
                        })
                    }))
                }, z = function (e, t, n, r, i, s, a, c, u) {
                    var l = {success: null, error: null};
                    return d.extend(l, c), d.extend(l, {
                        success: function (l) {
                            !function (e, t, n, r, i, o, s, a) {
                                t.szIP = n, 2 == r ? (t.szHttpProtocol = "https://", t.iHttpsPort = i) : (t.szHttpProtocol = "http://", t.iHttpPort = i), t.iCGIPort = i, t.szDeviceIdentify = n + "_" + i, t.iDeviceProtocol = 1, t.oProtocolInc = e, t.szAuth = a ? d.Base64.encode(o + ":" + s) : d.Base64.encode(":" + o + ":" + s)
                            }(e, t, n, r, i, s, a, u), o.push(t), v(t).then((() => {
                                c.success && c.success(l)
                            }))
                        }, error: function (e) {
                            c.error && c.error(e)
                        }
                    }), e.digestLogin(n, r, i, s, a, l, u)
                };

            function b() {
                this.szIP = "", this.szHostName = "", this.szAuth = "", this.szHttpProtocol = "http://", this.iCGIPort = 80, this.szDeviceIdentify = "", this.iDevicePort = -1, this.iHttpPort = -1, this.iHttpsPort = -1, this.iRtspPort = -1, this.iAudioType = 1, this.m_iAudioBitRate = -1, this.m_iAudioSamplingRate = -1, this.iDeviceProtocol = 1, this.oProtocolInc = null, this.iAnalogChannelNum = 0, this.szDeviceType = "", this.bVoiceTalk = !1, this.iDeviceMinusLocalTime = 0
            }

            this.I_SupportNoPlugin = function () {
                return !1
            }, this.I_Resize = function (e, t) {
                return n.JS_Resize(e, t)
            }, this.I_InitPlugin = function (t) {
                d.extend(e, t), e.aIframe = t.aIframe;
                var r = d.getDirName();
                r && ("object" == typeof exports && "undefined" != typeof module || ("function" == typeof define && define.amd ? require([r + "/jsVideoPlugin-1.0.0.min.js"], (function (e) {
                    window.JSVideoPlugin = e.JSVideoPlugin, t.cbInitPluginComplete && t.cbInitPluginComplete()
                })) : d.loadScript(r + "/jsVideoPlugin-1.0.0.min.js", (function () {
                    t.cbInitPluginComplete && t.cbInitPluginComplete()
                })))), window.addEventListener("resize", (function () {
                    if (null !== n) {
                        var t = $("#" + e.szContainerID);
                        n.JS_Resize(t.width(), t.height())
                    }
                })), window.addEventListener("unload", (function () {
                }))
            }, this.I_InsertOBJECTPlugin = function (e) {
                return x(e)
            }, this.I_WriteOBJECT_XHTML = function () {
                return 0
            }, this.I_ShowPlugin = function () {
                return new Promise((function (e, t) {
                    n.JS_ShowWnd().then((() => {
                        e()
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_HidPlugin = function () {
                return new Promise((function (e, t) {
                    n.JS_HideWnd().then((() => {
                        e()
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_DestroyPlugin = function () {
                return new Promise((function (e, t) {
                    n.JS_DestroyPlugin(!0).then((() => {
                        e()
                    }), (e => {
                        t(e)
                    }))
                }))
            }, this.I_OpenFileDlg = async function (e) {
                return new Promise((function (t, r) {
                    n.JS_OpenFileBrowser(e, "").then((e => {
                        t(e)
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_GetLocalCfg = function () {
                return new Promise((function (e, t) {
                    n.JS_GetLocalConfig().then((t => {
                        e(t)
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_SetLocalCfg = function (e) {
                return new Promise((function (t, r) {
                    n.JS_SetLocalConfig(e).then((() => {
                        t()
                    }), (e => {
                        let t = {};
                        t = 75 === e ? {
                            errorCode: 75,
                            errorMsg: "没有文件权限，创建文件失败"
                        } : 76 === e ? {errorCode: 76, errorMsg: "接口不支持"} : 6 === e ? {
                            errorCode: 6,
                            errorMsg: "服务未开启"
                        } : 5 === e ? {errorCode: 5, errorMsg: "空的文件目录"} : 4 === e ? {
                            errorCode: 4,
                            errorMsg: "动态加载dl1文件失败"
                        } : {errorCode: 7, errorMsg: "读取文件失败"}, r(t)
                    }))
                }))
            }, this.I_Login = function (e, t, n, r, i, o) {
                return new Promise((function (s, d) {
                    var c = e + "_" + n;
                    if (-1 != this.findDeviceIndexByIP(c)) return o.error && o.error({
                        errorCode: 2001,
                        errorMsg: "The device is already login."
                    }), void d({errorCode: 2001, errorMsg: "The device is already login."});
                    var u = a, l = new b;
                    z(u, l, e, t, n, r, i, o).then((() => {
                        s()
                    }), (a => {
                        401 === a.errorCode ? z(u, l, e, t, n, r, i, o, !0).then((() => {
                            s()
                        }), (e => {
                            d(e)
                        })) : d(a)
                    }))
                }))
            }, this.I_Logout = function (e) {
                return new Promise((function (t, n) {
                    var r = this.findDeviceIndexByIP(e);
                    -1 != r && (o.splice(r, 1), t())
                }))
            }, this.I_GetAudioInfo = function (e, t) {
                return new Promise((function (n, r) {
                    var i = this.findDeviceIndexByIP(e);
                    if (-1 != i) {
                        var s = o[i];
                        s.oProtocolInc.getAudioInfo(s, t).then((e => {
                            n(e)
                        }), (e => {
                            r(e)
                        }))
                    } else r(g)
                }))
            }, this.I_GetDeviceInfo = function (e, t) {
                return new Promise((function (n, r) {
                    var i = this.findDeviceIndexByIP(e);
                    if (-1 != i) {
                        var s = o[i];
                        s.oProtocolInc.getDeviceInfo(s, t).then((e => {
                            n(e)
                        }), (e => {
                            r(e)
                        }))
                    } else r(g)
                }))
            }, this.I_GetAnalogChannelInfo = function (e, t) {
                return new Promise((function (n, r) {
                    var i = this.findDeviceIndexByIP(e);
                    if (-1 != i) {
                        var s = o[i];
                        s.oProtocolInc.getAnalogChannelInfo(s, t).then((e => {
                            n(e)
                        }), (e => {
                            r(e)
                        }))
                    } else r(g)
                }))
            }, this.I_GetDigitalChannelInfo = function (e, t) {
                return new Promise((function (n, r) {
                    var i = this.findDeviceIndexByIP(e);
                    if (-1 != i) {
                        var s = o[i];
                        s.oProtocolInc.getDigitalChannelInfo(s, t).then((e => {
                            n(e)
                        }), (e => {
                            r(e)
                        }))
                    } else r(g)
                }))
            }, this.I_GetZeroChannelInfo = function (e, t) {
                return new Promise((function (n, r) {
                    var i = this.findDeviceIndexByIP(e);
                    if (-1 != i) {
                        var s = o[i];
                        s.oProtocolInc.getZeroChannelInfo(s, t).then((e => {
                            n(e)
                        }), (e => {
                            r(e)
                        }))
                    } else r(g)
                }))
            }, this.I_StartRealPlay = function (e, t) {
                return new Promise((function (n, i) {
                    var s = this.findDeviceIndexByIP(e),
                        a = {iWndIndex: r, iStreamType: 1, iChannelID: 1, bZeroChannel: !1};
                    if (d.extend(a, t), -1 != s) {
                        var c = o[s];
                        -1 == this.findWndIndexByIndex(a.iWndIndex) ? c.oProtocolInc.startRealPlay(c, a).then((function () {
                            t.success && t.success(), n()
                        }), (function () {
                            t.error && t.error(S), i(S)
                        })) : i({errorCode: 3001, errorMsg: "The window is already playing."})
                    } else t.error && t.error(g), i(g)
                }))
            }, this.I_StartPlay = function (e, t) {
                return new Promise((async function (n, i) {
                    var s = this.findDeviceIndexByIP(e), a = {iWndIndex: r};
                    d.extend(a, t);
                    var c = o[s];
                    -1 == (s = this.findWndIndexByIndex(a.iWndIndex)) ? c.oProtocolInc.startPlay(c, a).then((function () {
                        t.success && t.success(), n()
                    }), (function () {
                        t.error && t.error(S), i(S)
                    })) : i({errorCode: 3001, errorMsg: "The window is already playing."})
                }))
            }, this.I_SetSecretKey = function (e) {
                return new Promise(((t, r) => {
                    n.JS_SetSecretKey(0, e, 1).then((() => {
                        t()
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_GetEncryptString = function (e) {
                return new Promise(((t, r) => {
                    n.JS_GetEncryptString(3, e).then((e => {
                        t(e)
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_Stop = function (e) {
                return new Promise((async function (t, i) {
                    var o = {iWndIndex: r};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e);
                    var a = this.findWndIndexByIndex(o.iWndIndex);
                    if (-1 != a) {
                        var c = s[a];
                        c.bRecord && n.JS_StopSave(c.iIndex), c.bSound && n.JS_CloseSound(), c.bEZoom && n.JS_DisableZoom(c.iIndex), n.JS_Stop(o.iWndIndex).then((() => {
                            s.splice(a, 1), o.success && o.success(), t()
                        }), (() => {
                            o.error && o.error(S), i(S)
                        }))
                    } else t()
                }))
            }, this.I_StopAllPlay = function () {
                return new Promise((async function (e, t) {
                    n.JS_StopRealPlayAll().then((() => {
                        s.length = 0, e()
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_OpenSound = function (e) {
                return e = d.isUndefined(e) ? r : e, new Promise(((t, r) => {
                    var i = this.findWndIndexByIndex(e);
                    if (-1 != i) {
                        var o = s[i];
                        o.bSound ? r({
                            errorCode: 1e3,
                            errorMsg: "声音本来就是打开状态"
                        }) : n.JS_OpenSound(e).then((() => {
                            o.bSound = !0, t()
                        }), (() => {
                            r(S)
                        }))
                    } else r(S)
                }))
            }, this.I_CloseSound = function (e) {
                return e = d.isUndefined(e) ? r : e, new Promise(((t, r) => {
                    var i = this.findWndIndexByIndex(e);
                    if (-1 != i) {
                        var o = s[i];
                        o.bSound ? n.JS_CloseSound().then((() => {
                            o.bSound = !1, t()
                        }), (() => {
                            r(S)
                        })) : r({errorCode: 1e3, errorMsg: "声音本来就是关闭状态"})
                    } else r(S)
                }))
            }, this.I_SetVolume = function (e, t) {
                return new Promise(((i, o) => {
                    (e = parseInt(e, 10), isNaN(e)) ? o(y) : e < 0 || e > 100 ? o(y) : (t = d.isUndefined(t) ? r : t, -1 != this.findWndIndexByIndex(t) ? n.JS_SetVolume(t, e).then((() => {
                        i()
                    }), (() => {
                        o(S)
                    })) : o(S))
                }))
            }, this.I_CapturePic = function (e, t) {
                return new Promise(((i, o) => {
                    var s = {iWndIndex: r, bDateDir: !0};
                    d.isObject(t) ? d.extend(s, t) : d.isUndefined(t) || (s.iWndIndex = t), -1 != this.findWndIndexByIndex(s.iWndIndex) ? (".jpg" === e.slice(-4).toLowerCase() ? e = e.slice(0, -4) : ".jpeg" === e.slice(-5).toLowerCase() && (e = e.slice(0, -5)), n.JS_CapturePicture(s.iWndIndex, e, s.bDateDir).then((() => {
                        i()
                    }), (() => {
                        o(S)
                    }))) : o(S)
                }))
            }, this.I_CapturePicData = function (e) {
                return new Promise(((t, i) => {
                    var o = {iWndIndex: r, bDateDir: !0};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e), -1 != this.findWndIndexByIndex(o.iWndIndex) ? n.JS_GetCaptureData(o.iWndIndex).then((function (e) {
                        t(e)
                    }), (function (e) {
                        i(S)
                    })) : i(S)
                }))
            }, this.I_StartRecord = function (e, t) {
                return new Promise(((i, o) => {
                    var a = {iWndIndex: r, bDateDir: !0};
                    d.isObject(t) ? d.extend(a, t) : d.isUndefined(t) || (a.iWndIndex = t);
                    var c = this.findWndIndexByIndex(a.iWndIndex);
                    if (-1 != c) {
                        var u = s[c];
                        u.bRecord ? (a.error && a.error(S), o(S)) : n.JS_StartSave(a.iWndIndex, e).then((function () {
                            u.bRecord = !0, a.success && a.success(), i()
                        }), (function (e) {
                            let t = {};
                            601 === e ? t = {
                                errorCode: 601,
                                errorMsg: "操作注册表失败"
                            } : 602 === e ? t = {
                                errorCode: 602,
                                errorMsg: "磁盘空间不足"
                            } : 603 === e ? t = {
                                errorCode: 603,
                                errorMsg: "创建文件夹失败"
                            } : 604 === e ? t = {
                                errorCode: 604,
                                errorMsg: "调用NPAPI提供的方法失败"
                            } : 605 === e && (t = {
                                errorCode: 605,
                                errorMsg: "文件夹没有读写权限"
                            }), a.error && a.error(t), o(t)
                        }))
                    } else a.error && a.error(S), o(S)
                }))
            }, this.I_StopRecord = function (e) {
                return new Promise(((t, i) => {
                    var o = {iWndIndex: r};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e);
                    var a = this.findWndIndexByIndex(o.iWndIndex);
                    if (-1 != a) {
                        var c = s[a];
                        c.bRecord ? n.JS_StopSave(o.iWndIndex).then((function () {
                            c.bRecord = !1, o.success && o.success(), t()
                        }), (function () {
                            o.error && o.error(S), i(S)
                        })) : (o.error && o.error(S), i(S))
                    } else o.error && o.error(S), i(S)
                }))
            }, this.I_StartVoiceTalk = function (e, t) {
                return new Promise(((n, r) => {
                    if (isNaN(parseInt(t, 10))) r(y); else {
                        var i = this.findDeviceIndexByIP(e);
                        if (-1 != i) {
                            var s = o[i];
                            s.bVoiceTalk ? r({errorCode: 1e3, errorMsg: "已经处于对讲模式！"}) : v(s).then((() => {
                                s.oProtocolInc.startVoiceTalk(s, t).then((() => {
                                    o[i].bVoiceTalk = !0, n()
                                }), (e => {
                                    r(e)
                                }))
                            }))
                        } else r(S)
                    }
                }))
            }, this.I_StopVoiceTalk = function () {
                return new Promise(((e, t) => {
                    n.JS_StopTalk().then((() => {
                        for (var t = 0, n = o.length; t < n; t++) if (o[t].bVoiceTalk) {
                            o[t].bVoiceTalk = !1;
                            break
                        }
                        e()
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_StartAudioPlay = function (e, t) {
                return new Promise(((n, r) => {
                    var i = this.findDeviceIndexByIP(e);
                    if (-1 != i) {
                        var s = o[i];
                        t.szAuth = s.szAuth, s.bVoiceTalk ? r(S) : s.oProtocolInc.audioPlay(t).then((() => {
                            o[i].bVoiceTalk = !0, n()
                        }), (() => {
                            r(S)
                        }))
                    } else r(S)
                }))
            }, this.I_StopAudioPlay = function () {
                return new Promise(((e, t) => {
                    n.JS_StopAudioPlay().then((() => {
                        for (var t = 0, n = o.length; t < n; t++) if (o[t].bVoiceTalk) {
                            o[t].bVoiceTalk = !1;
                            break
                        }
                        e()
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_PTZControl = function (e, t, n) {
                return new Promise(((i, a) => {
                    var c = {iWndIndex: r, iPTZIndex: e, iPTZSpeed: 4};
                    d.extend(c, n);
                    var u = this.findWndIndexByIndex(c.iWndIndex);
                    if (-1 != u) {
                        var l = s[u];
                        if (-1 != (u = this.findDeviceIndexByIP(l.szIP))) {
                            var p = o[u];
                            9 == e ? p.oProtocolInc.ptzAutoControl(p, t, l, c).then((() => {
                                i()
                            }), (e => {
                                a(e)
                            })) : p.oProtocolInc.ptzControl(p, t, l, c).then((() => {
                                i()
                            }), (e => {
                                a(e)
                            }))
                        }
                    }
                }))
            }, this.I_EnableEZoom = function (e) {
                return new Promise(((t, i) => {
                    e = d.isUndefined(e) ? r : e;
                    var o = this.findWndIndexByIndex(e);
                    if (-1 != o) {
                        var a = s[o];
                        a.bEZoom || n.JS_EnableZoom(e).then((() => {
                            a.bEZoom = !0, t()
                        }), (() => {
                            i(S)
                        }))
                    } else i(S)
                }))
            }, this.I_DisableEZoom = function (e) {
                return new Promise(((t, i) => {
                    e = d.isUndefined(e) ? r : e;
                    var o = this.findWndIndexByIndex(e);
                    if (-1 != o) {
                        var a = s[o];
                        a.bEZoom ? n.JS_DisableZoom(e).then((() => {
                            a.bEZoom = !1, t()
                        }), (() => {
                            i(S)
                        })) : t()
                    } else i(S)
                }))
            }, this.I_Enable3DZoom = function (e) {
                return new Promise(((t, i) => {
                    e = d.isUndefined(e) ? r : e;
                    var a = this.findWndIndexByIndex(e);
                    if (-1 != a) {
                        var u = s[a];
                        u.b3DZoom || (n.JS_SetDrawCallback(e, !0, "Rect", !1, (function (e) {
                            !function (e) {
                                var t = c.findWndIndexByIndex(r);
                                if (-1 != t) {
                                    var n = s[t];
                                    if (-1 != (t = c.findDeviceIndexByIP(n.szDeviceIdentify))) {
                                        var i = o[t];
                                        i.oProtocolInc.set3DZoom(i, n, e, {
                                            success: function (e) {
                                                console.log("3D放大成功！"), f(n.szDeviceIdentify + " 3D放大成功！")
                                            }, error: function () {
                                                console.log("设备不支持，3D放大失败！"), f(n.szDeviceIdentify + " 设备不支持，3D放大失败！")
                                            }
                                        })
                                    }
                                }
                            }(e.points)
                        })), u.b3DZoom = !0), t()
                    } else i(S)
                }))
            }, this.I_Disable3DZoom = function (e) {
                return new Promise(((t, i) => {
                    e = d.isUndefined(e) ? r : e;
                    var o = this.findWndIndexByIndex(e);
                    if (-1 != o) {
                        var a = s[o];
                        a.b3DZoom ? (n.JS_SetDrawCallback(e, !1, "Rect", !1, (function () {
                        })), a.b3DZoom = !1, t()) : t()
                    } else i(S)
                }))
            }, this.I_FullScreen = function (e) {
                return new Promise((function (t, r) {
                    n.JS_FullScreenDisplay(e).then((() => {
                        t()
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_SetPreset = function (e, t) {
                return new Promise((function (n, i) {
                    var a = {iWndIndex: r, iPresetID: e};
                    d.extend(a, t);
                    var c = this.findWndIndexByIndex(a.iWndIndex);
                    if (-1 != c) {
                        var u = s[c];
                        if (-1 != (c = this.findDeviceIndexByIP(u.szIP))) {
                            var l = o[c];
                            l.oProtocolInc.setPreset(l, u, a).then((() => {
                                n()
                            }), (e => {
                                i(e)
                            }))
                        } else i(S)
                    } else i(S)
                }))
            }, this.I_GoPreset = function (e, t) {
                return new Promise((async function (n, i) {
                    var a = {iWndIndex: r, iPresetID: e};
                    d.extend(a, t);
                    var c = this.findWndIndexByIndex(a.iWndIndex);
                    if (-1 != c) {
                        var u = s[c];
                        if (-1 != (c = this.findDeviceIndexByIP(u.szIP))) {
                            var l = o[c];
                            l.oProtocolInc.goPreset(l, u, a).then((() => {
                                n()
                            }), (e => {
                                i(e)
                            }))
                        } else i(S)
                    } else i(S)
                }))
            }, this.I_RecordSearch = function (e, t, n, r, i) {
                return new Promise((async function (s, a) {
                    var c = this.findDeviceIndexByIP(e);
                    if (-1 != c) {
                        var u = o[c];
                        u.szDeviceType !== l && u.szDeviceType !== p && u.szDeviceType !== h || (n = d.convertToUTCTime(n), r = d.convertToUTCTime(r));
                        var f = {iChannelID: t, szStartTime: n, szEndTime: r, iSearchPos: 0, iStreamType: 1};
                        d.extend(f, i), f.success = null, u.oProtocolInc.recordSearch(u, f).then((e => {
                            if (u.szDeviceType === l || u.szDeviceType === p || u.szDeviceType === h) for (var t = "", n = "", r = 0, o = $(e).find("searchMatchItem").length; r < o; r++) t = $(e).find("startTime").eq(r).text(), n = $(e).find("endTime").eq(r).text(), t = d.convertToLocalTime(t, u.iDeviceMinusLocalTime), n = d.convertToLocalTime(n, u.iDeviceMinusLocalTime), $(e).find("startTime").eq(r).text(t), $(e).find("endTime").eq(r).text(n);
                            i.success && i.success(e), s(e)
                        }), (e => {
                            a(e)
                        }))
                    } else a(g)
                }))
            }, this.I_StartPlayback = function (e, t) {
                return new Promise((function (n, i) {
                    var s = this.findDeviceIndexByIP(e), a = "", c = "", u = 1, f = 0,
                        I = d.dateFormat(new Date, "yyyy-MM-dd"), P = {
                            iWndIndex: r,
                            iStreamType: 1,
                            iChannelID: 1,
                            szStartTime: I + " 00:00:00",
                            szEndTime: I + " 23:59:59"
                        };
                    if (d.extend(P, t), -1 != s) {
                        var m = o[s];
                        a = m.oProtocolInc.CGI.startPlayback, c = "rtsp://", f = P.iStreamType, u = 100 * P.iChannelID + f, d.extend(P, {
                            urlProtocol: c,
                            cgi: a,
                            iChannelID: u
                        }), -1 == (s = this.findWndIndexByIndex(P.iWndIndex)) && (m.szDeviceType !== l && m.szDeviceType !== p && m.szDeviceType !== h || (P.szStartTime = d.convertToUTCTime(P.szStartTime), P.szEndTime = d.convertToUTCTime(P.szEndTime)), P.szStartTime = P.szStartTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", P.szEndTime = P.szEndTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", m.oProtocolInc.startPlayback(m, P).then((function () {
                            t.success && t.success(), n()
                        }), (function () {
                            t.error && t.error(S), i(S)
                        })))
                    } else t.error && t.error(g), i(g)
                }))
            }, this.I_ReversePlayback = function (e, t) {
                return new Promise((function (n, i) {
                    var s = this.findDeviceIndexByIP(e), a = "", c = "", l = -1, p = 0,
                        h = d.dateFormat(new Date, "yyyy-MM-dd"), f = {
                            iWndIndex: r,
                            iStreamType: 1,
                            iChannelID: 1,
                            szStartTime: h + " 00:00:00",
                            szEndTime: h + " 23:59:59"
                        };
                    if (d.extend(f, t), -1 != s) {
                        var I = o[s];
                        parseInt(u.protocolType, 10);
                        a = I.oProtocolInc.CGI.startPlayback, c = "rtsp://", p = f.iStreamType, l = 100 * f.iChannelID + p, d.extend(f, {
                            urlProtocol: c,
                            cgi: a,
                            iChannelID: l
                        }), -1 == (s = this.findWndIndexByIndex(f.iWndIndex)) && (f.szStartTime = f.szStartTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", f.szEndTime = f.szEndTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", I.oProtocolInc.reversePlayback(I, f).then((function () {
                            t.success && t.success(), n()
                        }), (function () {
                            t.error && t.error(S), i(S)
                        })))
                    }
                }))
            }, this.I_Frame = function (e) {
                return new Promise((async function (t, i) {
                    var o = {iWndIndex: r};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e);
                    var a = this.findWndIndexByIndex(o.iWndIndex);
                    if (-1 != a) {
                        var c = s[a], u = c.iPlayStatus;
                        2 == u || 4 == u || 5 == u ? n.JS_FrameForward(o.iWndIndex).then((function () {
                            c.iPlayStatus = 4, o.success && o.success(), t()
                        }), (function () {
                            o.error && o.error(S), i(S)
                        })) : (o.error && o.error(S), i(S))
                    } else o.error && o.error(S), i(S)
                }))
            }, this.I_Pause = function (e) {
                return new Promise((async function (t, i) {
                    var o = {iWndIndex: r};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e);
                    var a = this.findWndIndexByIndex(o.iWndIndex);
                    if (-1 != a) {
                        var c = s[a], u = c.iPlayStatus, l = -1;
                        if (2 == u) l = 3; else {
                            if (5 != u) return o.error && o.error(S), void i(S);
                            l = 6
                        }
                        n.JS_Pause(o.iWndIndex).then((function () {
                            c.iPlayStatus = l, o.success && o.success(), t()
                        }), (function () {
                            o.error && o.error(S), i(S)
                        }))
                    } else o.error && o.error(S), i(S)
                }))
            }, this.I_Resume = function (e) {
                return new Promise((async function (t, i) {
                    var o = {iWndIndex: r};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e);
                    var a = this.findWndIndexByIndex(o.iWndIndex);
                    if (-1 != a) {
                        var c = s[a], u = c.iPlayStatus, l = -1;
                        if (3 == u || 4 == u) l = 2; else {
                            if (6 != u) return o.error && o.error(S), void i(S);
                            l = 5
                        }
                        n.JS_Resume(o.iWndIndex).then((function () {
                            c.iPlayStatus = l, o.success && o.success(), t()
                        }), (function () {
                            o.error && o.error(S), i(S)
                        }))
                    } else o.error && o.error(S), i(S)
                }))
            }, this.I_PlaySlow = function (e) {
                return new Promise((async function (t, i) {
                    var o = {iWndIndex: r};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e);
                    var a = this.findWndIndexByIndex(o.iWndIndex);
                    -1 != a ? 2 == s[a].iPlayStatus ? n.JS_Slow(o.iWndIndex).then((function () {
                        o.success && o.success(), t()
                    }), (function () {
                        o.error && o.error(S), i(S)
                    })) : (o.error && o.error(S), i(S)) : (o.error && o.error(S), i(S))
                }))
            }, this.I_PlayFast = function (e) {
                return new Promise((async function (t, i) {
                    var o = {iWndIndex: r};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e);
                    var a = this.findWndIndexByIndex(o.iWndIndex);
                    -1 != a ? 2 == s[a].iPlayStatus ? n.JS_Fast(o.iWndIndex).then((function () {
                        o.success && o.success(), t()
                    }), (function () {
                        o.error && o.error(S), i(S)
                    })) : (o.error && o.error(S), i(S)) : (o.error && o.error(S), i(S))
                }))
            }, this.I_GetOSDTime = function (e) {
                return new Promise((async function (t, i) {
                    var o = {iWndIndex: r};
                    d.isObject(e) ? d.extend(o, e) : d.isUndefined(e) || (o.iWndIndex = e), -1 != this.findWndIndexByIndex(o.iWndIndex) ? n.JS_GetOSDTime(o.iWndIndex).then((function (e) {
                        if (o.success) {
                            var n = d.dateFormat(new Date(1e3 * e), "yyyy-MM-dd hh:mm:ss");
                            o.success(n)
                        }
                        t(n)
                    }), (function () {
                        o.error && o.error(S), i(S)
                    })) : (o.error && o.error(S), i(S))
                }))
            }, this.I_StartDownloadRecord = function (e, t, n, r) {
                return new Promise(((i, s) => {
                    var a = this.findDeviceIndexByIP(e);
                    if (-1 != a) {
                        var c = o[a], u = {szPlaybackURI: t, szFileName: n + ".mp4", bDateDir: !0};
                        d.isUndefined(r) || d.extend(u, r), c.oProtocolInc.startDownloadRecord(c, u).then((e => {
                            i(e)
                        }), (e => {
                            s(e)
                        }))
                    } else s(g)
                }))
            }, this.I_StartDownloadRecordByTime = function (e, t, n, r, i, s) {
                return new Promise(((a, c) => {
                    var u = this.findDeviceIndexByIP(e);
                    if (-1 != u) {
                        var l = o[u], p = {
                            szPlaybackURI: t = t.split("?")[0] + "?starttime=" + r.replace(" ", "T") + "Z&endtime=" + i.replace(" ", "T") + "Z",
                            szFileName: n + ".mp4",
                            bDateDir: !0
                        };
                        d.isUndefined(s) || d.extend(p, s), l.oProtocolInc.startDownloadRecord(l, p).then((e => {
                            a(e)
                        }), (e => {
                            c(e)
                        }))
                    }
                }))
            }, this.I_GetDownloadStatus = function (e) {
                return new Promise(((t, r) => {
                    n.JS_GetDownloadStatus(e).then((e => {
                        t(e)
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_GetDownloadProgress = function (e) {
                return new Promise(((t, r) => {
                    n.JS_GetDownloadProgress(e).then((e => {
                        t(e)
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_StopDownloadRecord = function (e) {
                return new Promise(((t, r) => {
                    n.JS_StopAsyncDownload(e).then((() => {
                        t()
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_ExportDeviceConfig = function (e) {
                return new Promise(((t, n) => {
                    var r = this.findDeviceIndexByIP(e);
                    if (-1 != r) {
                        var i = o[r];
                        i.oProtocolInc.exportDeviceConfig(i).then((() => {
                            t()
                        }), (() => {
                            n(S)
                        }))
                    } else n(g)
                }))
            }, this.I_ImportDeviceConfig = function (e, t) {
                return new Promise(((n, r) => {
                    var i = this.findDeviceIndexByIP(e);
                    if (-1 != i) {
                        var s = o[i], a = {szFileName: t};
                        s.oProtocolInc.importDeviceConfig(s, a).then((() => {
                            n()
                        }), (() => {
                            r(S)
                        }))
                    } else r(g)
                }))
            }, this.I_RestoreDefault = function (e, t, n) {
                return new Promise(((r, i) => {
                    var s = {success: null, error: null};
                    d.extend(s, n);
                    var a = this.findDeviceIndexByIP(e);
                    if (-1 != a) {
                        var c = o[a];
                        c.oProtocolInc.restore(c, t, s).then((() => {
                            r()
                        }), (e => {
                            i(e)
                        }))
                    } else i(g)
                }))
            }, this.I_Restart = function (e, t) {
                return new Promise(((n, r) => {
                    var i = this.findDeviceIndexByIP(e), s = {success: null, error: null, async: !1};
                    if (d.extend(s, t), -1 != i) {
                        var a = o[i];
                        a.oProtocolInc.restart(a, s).then((e => {
                            n(e)
                        }), (e => {
                            r(e)
                        }))
                    } else r(g)
                }))
            }, this.I_Reconnect = function (e, t) {
                return new Promise(((n, r) => {
                    var i = {success: null, error: null};
                    d.extend(i, t);
                    var s = this.findDeviceIndexByIP(e);
                    if (-1 != s) {
                        var a = o[s];
                        a.oProtocolInc.login(a.szIP, a.iCGIPort, a.szAuth, i).then((() => {
                            n()
                        }), (e => {
                            r(e)
                        }))
                    } else r(g)
                }))
            }, this.I_StartUpgrade = function (e, t) {
                return new Promise(((n, r) => {
                    var i = this.findDeviceIndexByIP(e);
                    if (-1 != i) {
                        var s = o[i];
                        s.oProtocolInc.startUpgrade(s, t).then((() => {
                            n()
                        }), (() => {
                            r(S)
                        }))
                    } else r(g)
                }))
            }, this.I_UpgradeStatus = function (e) {
                return new Promise(((t, n) => {
                    this.I_SendHTTPRequest(e, a.CGI.startUpgrade.status, {}).then((e => {
                        var n = "true" === $(e).find("upgrading").eq(0).text();
                        t(n)
                    }), (() => {
                        n(S)
                    }))
                }))
            }, this.I_UpgradeProgress = function (e) {
                return new Promise(((t, n) => {
                    this.I_SendHTTPRequest(e, a.CGI.startUpgrade.status, {}).then((e => {
                        var n = parseInt($(e).find("percent").eq(0).text(), 10);
                        t(n)
                    }), (() => {
                        n(S)
                    }))
                }))
            }, this.I_StopUpgrade = function () {
                return new Promise(((e, t) => {
                    n.JS_StopUpgrade().then((() => {
                        e()
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_CheckPluginInstall = function () {
                return !0
            }, this.I_CheckPluginVersion = function () {
                return new Promise(((e, t) => {
                    n.JS_CheckUpdate("<?xml version='1.0' encoding='utf-8'?><FileVersion><Platform name='win32'><localServiceControl>4.0.2503.2</localServiceControl>").then((t => {
                        e(t)
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_SendHTTPRequest = function (e, t, n) {
                return new Promise((async function (r, i) {
                    var s = new R, a = "", c = "", u = this.findDeviceIndexByIP(e);
                    if (u >= 0) {
                        "%" === t.substr(0, 1) && (t = t.substr(8));
                        var l = o[u];
                        a = l.szHttpProtocol + l.szIP + ":" + l.iCGIPort + "/" + t, c = l.szAuth
                    }
                    var p = {type: "GET", url: a, auth: c, success: null, error: null};
                    d.extend(p, n), s.submitRequest(p).then((function (e) {
                        if (200 === e.httpStatusCode) {
                            let t;
                            t = 0 === e.httpResponse.indexOf("<?xml") || -1 !== e.httpResponse.indexOf("<!DOCTYPE html>") || -1 !== e.httpResponse.indexOf("xmlns=") ? d.loadXML(e.httpResponse) : JSON.parse(e.httpResponse), n.success && n.success(t), r(t)
                        } else if (200 !== e.httpStatusCode) {
                            let t = d.loadXML(e.httpResponse);
                            t || (t = JSON.parse(e.httpResponse)), n.error && n.error({
                                errorCode: e.httpStatusCode,
                                errorMsg: t
                            }), i({errorCode: e.httpStatusCode, errorMsg: t})
                        }
                    }), (function (e) {
                        n.error && n.error({errorCode: e, errorMsg: ""}), i({errorCode: e, errorMsg: ""})
                    }))
                }))
            }, this.I_ChangeWndNum = function (e) {
                return new Promise(((t, r) => {
                    n.JS_ArrangeWindow(e).then((() => {
                        t()
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_ArrangeWindow = function (e) {
                return new Promise(((t, r) => {
                    let i;
                    "1*2" === e ? i = [{width: .5, height: .9996, top: 2e-4, left: 0}, {
                        width: .5,
                        height: .9996,
                        top: 2e-4,
                        left: .5
                    }] : "2*1" === e && (i = [{width: .9996, height: .5, top: 2e-4, left: 0}, {
                        width: .9996,
                        height: .5,
                        top: .5,
                        left: 0
                    }]), n.JS_ArrangeWindow(1, i).then((() => {
                        t()
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_GetLastError = function () {
                return new Promise(((e, t) => {
                    n.JS_GetLastError().then((t => {
                        e(t)
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_GetWindowStatus = function (e) {
                if (d.isUndefined(e)) {
                    var t = [];
                    return d.extend(t, s), t
                }
                var n = this.findWndIndexByIndex(e);
                if (-1 != n) {
                    t = {};
                    return d.extend(t, s[n]), t
                }
                return null
            }, this.I_GetIPInfoByMode = function (e, t, n, r) {
            }, this.I_SetDrawStatus = function (e) {
                return new Promise(((t, r) => {
                    n.JS_SetDrawStatus(e).then((() => {
                        t()
                    }), (e => {
                        r(e)
                    }))
                }))
            }, this.I_SetSnapDrawMode = function (e, t) {
                let r = !1;
                return -1 !== t && (r = !0), new Promise(((e, i) => {
                    n.JS_SetDrawStatus(r, t).then((() => {
                        e()
                    }), (() => {
                        i(S)
                    }))
                }))
            }, this.I_SetSnapPolygonInfo = function (e, t) {
                return void 0 !== e && n.JS_SetWindowSelected(e), new Promise(((e, i) => {
                    var o = [], s = d.formatPolygonXmlToJson(t);
                    s.aAddRect.length > 0 && o.push(n.JS_SetDrawShapeInfo("Rect", s.aAddRect[0], r)), s.aAddPolygon.length > 0 && o.push(n.JS_SetDrawShapeInfo("Polygon", s.aAddPolygon[0], r)), s.aRect.length > 0 && o.push(n.JS_SetRectInfo(s.aRect)), s.aPolygon.length > 0 && o.push(n.JS_SetPolygonInfo(s.aPolygon)), Promise.all(o).then((() => {
                        e()
                    }), (() => {
                        i(S)
                    }))
                }))
            }, this.I_GetSnapPolygonInfo = function (e) {
                return void 0 !== e && n.JS_SetWindowSelected(e), new Promise(((e, t) => {
                    var r = [];
                    r.push(n.JS_GetPolygonInfo()), r.push(n.JS_GetRectInfo()), Promise.all(r).then((t => {
                        var n = d.formatPolygonJsonToXml(t);
                        e(n)
                    }), (() => {
                        t(S)
                    }))
                }))
            }, this.I_ClearSnapInfo = function (e, t) {
                return void 0 !== e && n.JS_SetWindowSelected(e), new Promise(((e, r) => {
                    if (t) {
                        var i = [], o = [];
                        t.forEach((t => {
                            1 === t.polygonType ? i.push(t.id) : o.push(t.id);
                            var s = [];
                            i.length && s.push(n.JS_ClearShapeByType("Polygon", i)), o.length && s.push(n.JS_ClearShapeByType("Rect", o)), Promise.all(s).then((() => {
                                e()
                            }), (() => {
                                r(S)
                            }))
                        }))
                    } else n.JS_ClearShapeByType("AllWindows").then((() => {
                        e()
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_DeviceCapturePic = function (e, t, n, r) {
                return !1
            }, this.I_SetPackageType = function (e) {
                return new Promise(((t, r) => {
                    n.JS_SetPackageType(e).then((() => {
                        t()
                    }), (() => {
                        r(S)
                    }))
                }))
            }, this.I_GetDevicePort = function (e) {
                return new Promise((async (t, n) => {
                    var r = this.findDeviceIndexByIP(e);
                    if (-1 != r) {
                        var i = o[r];
                        try {
                            t(await T(i))
                        } catch (e) {
                            n({errorCode: 1001, errorMsg: ""})
                        }
                    } else n(g)
                }))
            }, this.I_GetTextOverlay = function (e, t, n) {
                return new Promise(((r, i) => {
                    var a = this.findDeviceIndexByIP(t);
                    if (-1 != a) {
                        var d = o[a], c = (s[a], {type: "GET", success: n.success, error: n.error});
                        this.I_SendHTTPRequest(d.szIP + "_" + d.iCGIPort, e, c).then((e => {
                            r(e)
                        }), (e => {
                            i(e)
                        }))
                    } else i(g)
                }))
            }, this.findDeviceIndexByIP = function (e) {
                if (e.indexOf("_") > -1) {
                    for (var t = 0, n = o.length; t < n; t++) if (o[t].szDeviceIdentify == e) return t
                } else for (t = 0, n = o.length; t < n; t++) if (o[t].szIP == e) return t;
                return -1
            }, this.findWndIndexByIndex = function (e) {
                for (var t = 0, n = s.length; t < n; t++) if (s[t].iIndex == e) return t;
                return -1
            };
            var A = function () {
                this.iIndex = 0, this.szIP = "", this.iCGIPort = 80, this.szDeviceIdentify = "", this.iChannelID = "", this.iPlayStatus = 0, this.bSound = !1, this.bRecord = !1, this.bPTZAuto = !1, this.bEZoom = !1, this.b3DZoom = !1
            }, R = function () {
                this.options = {
                    type: "GET",
                    url: "",
                    auth: "",
                    timeout: 3e4,
                    data: "",
                    async: !0,
                    success: null,
                    error: null
                }, this.m_szHttpHead = "", this.m_szHttpContent = "", this.m_szHttpData = ""
            };
            R.prototype.submitRequest = function (e) {
                return e.method = this.getHttpMethod(e.type), e.content = e.data, delete e.type, delete e.data, n.JS_SubmitHttpRequest(e)
            }, R.prototype.getHttpMethod = function (e) {
                var t = {GET: 1, POST: 2, PUT: 5, DELETE: 6}[e];
                return t || -1
            };
            var L, W, q = function () {
            };
            q.prototype.CGI = {
                login: "%s%s:%s/ISAPI/Security/userCheck",
                getAudioInfo: "%s%s:%s/ISAPI/System/TwoWayAudio/channels",
                getDeviceInfo: "%s%s:%s/ISAPI/System/deviceInfo",
                getAnalogChannelInfo: "%s%s:%s/ISAPI/System/Video/inputs/channels",
                getDigitalChannel: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels",
                getDigitalChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/status",
                getZeroChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels",
                getStreamChannels: {
                    analog: "%s%s:%s/ISAPI/Streaming/channels",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels"
                },
                startRealPlay: {channels: "video://%s:%s/%s", zeroChannels: "video://%s:%s/0"},
                startVoiceTalk: {
                    open: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/open",
                    close: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/close",
                    audioData: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/audioData"
                },
                ptzControl: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/continuous",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/continuous"
                },
                ptzAutoControl: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/autoPan",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/autoPan"
                },
                setPreset: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s"
                },
                goPreset: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s/goto"
                },
                ptzFocus: {
                    analog: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/focus",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/focus"
                },
                ptzIris: {
                    analog: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/iris",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/iris"
                },
                getNetworkBond: "%s%s:%s/ISAPI/System/Network/Bond",
                getNetworkInterface: "%s%s:%s/ISAPI/System/Network/interfaces",
                getUPnPPortStatus: "%s%s:%s/ISAPI/System/Network/UPnP/ports/status",
                getPPPoEStatus: "%s%s:%s/ISAPI/System/Network/PPPoE/1/status",
                getPortInfo: "%s%s:%s/ISAPI/Security/adminAccesses",
                recordSearch: "%s%s:%s/ISAPI/ContentMgmt/search",
                startPlayback: "video://%s:%s/%s",
                startWsPlayback: "%s%s:%s/%s",
                startShttpPlayback: "%s%s:%s/SDK/playback/%s",
                startShttpReversePlayback: "%s%s:%s/SDK/playback/%s/reversePlay",
                startTransCodePlayback: "%s%s:%s/SDK/playback/%s/transcoding",
                startDownloadRecord: "%s%s:%s/ISAPI/ContentMgmt/download",
                downloaddeviceConfig: "%s%s:%s/ISAPI/System/configurationData",
                uploaddeviceConfig: "%s%s:%s/ISAPI/System/configurationData",
                restart: "%s%s:%s/ISAPI/System/reboot",
                restore: "%s%s:%s/ISAPI/System/factoryReset?mode=%s",
                startUpgrade: {
                    upgrade: "%s%s:%s/ISAPI/System/updateFirmware",
                    status: "%s%s:%s/ISAPI/System/upgradeStatus"
                },
                set3DZoom: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/position3D",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/position3D"
                },
                getSecurityVersion: "%s%s:%s/ISAPI/Security/capabilities?username=admin",
                SDKCapabilities: "%s%s:%s/SDK/capabilities",
                deviceCapture: {channels: "%s%s:%s/ISAPI/Streaming/channels/%s/picture"},
                overlayInfo: {
                    analog: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/overlays/",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/overlays"
                },
                sessionCap: "%s%s:%s/ISAPI/Security/sessionLogin/capabilities?username=%s",
                sessionLogin: "%s%s:%s/ISAPI/Security/sessionLogin",
                sessionHeartbeat: "%s%s:%s/ISAPI/Security/sessionHeartbeat",
                sessionLogout: "%s%s:%s/ISAPI/Security/sessionLogout",
                systemCapabilities: "%s%s:%s/ISAPI/System/capabilities",
                time: "ISAPI/System/time"
            }, q.prototype.login = function (e, t, n, r) {
                return c.I_SendHTTPRequest(e + "_" + t, this.CGI.login, r)
            }, q.prototype.getAudioInfo = function (e, n) {
                return new Promise((function (r, i) {
                    var o = {};
                    d.extend(o, n), d.extend(o, {
                        success: function (i) {
                            var o = t.$XML(i).find("audioCompressionType", !0);
                            if (o.length > 0) {
                                var s = t.$XML(o).eq(0).text(), a = 0;
                                "G.711ulaw" == s ? a = 1 : "G.711alaw" == s ? a = 2 : "G.726" == s ? a = 3 : "MP2L2" == s || "MPEL2" == s ? a = 4 : "G.722.1" == s ? a = 0 : "AAC" == s ? a = 5 : "PCM" == s ? a = 6 : "MP3" == s && (a = 7), e.iAudioType = a
                            }
                            "" !== t.$XML(i).find("audioBitRate").eq(0).text() ? e.m_iAudioBitRate = 1e3 * parseInt(t.$XML(i).find("audioBitRate").eq(0).text(), 10) : e.m_iAudioBitRate = 0, "" !== t.$XML(i).find("audioSamplingRate").eq(0).text() ? e.m_iAudioSamplingRate = 1e3 * parseInt(t.$XML(i).find("audioSamplingRate").eq(0).text(), 10) : e.m_iAudioSamplingRate = 0, "" !== t.$XML(i).find("channelNum").eq(0).text() ? e.m_iSoundChan = parseInt(t.$XML(i).find("channelNum").eq(0).text(), 10) : e.m_iSoundChan = 1, "" !== t.$XML(i).find("deviceCastChannelNum").eq(0).text() ? e.m_iDeviceAudioSoundChan = parseInt(t.$XML(i).find("deviceCastChannelNum").eq(0).text(), 10) : e.m_iDeviceAudioSoundChan = 1, n.success && n.success(i), r(i)
                        }, error: function (e) {
                            n.error && n.error(e), i(e)
                        }
                    }), c.I_SendHTTPRequest(e.szDeviceIdentify, a.CGI.getAudioInfo, o)
                }))
            }, q.prototype.getDeviceInfo = function (e, n) {
                return new Promise((function (r, i) {
                    var o = {};
                    d.extend(o, n), d.extend(o, {
                        success: function (i) {
                            var o;
                            e.szDeviceType = t.$XML(i).find("deviceType").eq(0).text();
                            var s = [];
                            s.push("<DeviceInfo>"), s.push("<deviceName>" + d.escape(t.$XML(i).find("deviceName").eq(0).text()) + "</deviceName>"), s.push("<deviceID>" + t.$XML(i).find("deviceID").eq(0).text() + "</deviceID>"), s.push("<deviceType>" + t.$XML(i).find("deviceType").eq(0).text() + "</deviceType>"), s.push("<model>" + t.$XML(i).find("model").eq(0).text() + "</model>"), s.push("<serialNumber>" + t.$XML(i).find("serialNumber").eq(0).text() + "</serialNumber>"), s.push("<macAddress>" + t.$XML(i).find("macAddress").eq(0).text() + "</macAddress>"), s.push("<firmwareVersion>" + t.$XML(i).find("firmwareVersion").eq(0).text() + "</firmwareVersion>"), s.push("<firmwareReleasedDate>" + t.$XML(i).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>"), s.push("<encoderVersion>" + t.$XML(i).find("encoderVersion").eq(0).text() + "</encoderVersion>"), s.push("<encoderReleasedDate>" + t.$XML(i).find("encoderReleasedDate").eq(0).text() + "</encoderReleasedDate>"), s.push("</DeviceInfo>"), o = d.loadXML(s.join("")), n.success && n.success(o), r(o)
                        }, error: function (e) {
                            n.error && n.error(e), i(e)
                        }
                    }), c.I_SendHTTPRequest(e.szDeviceIdentify, a.CGI.getDeviceInfo, o)
                }))
            }, q.prototype.getDeviceMinusLocalTime = function (e) {
                return new Promise((function (t, n) {
                    var r = {
                        success: n => {
                            var r = $(n).find("localTime").eq(0).text().substring(0, 19).match(/(\d+)-(\d+)-(\d+)(\D+)(\d+):(\d+):(\d+)/);
                            if (8 === r.length) {
                                var i = new Date(r[1], r[2] - 1, r[3], r[5], r[6], r[7]),
                                    o = $(n).find("timeZone").eq(0).text(), s = 0, a = o.indexOf("DST");
                                if (-1 != a) {
                                    var d = new Date(i.getTime());
                                    d.setMinutes(0), d.setSeconds(0);
                                    var c = new Date(i.getTime());
                                    c.setMinutes(0), c.setSeconds(0);
                                    var u = o.split(",")[1], l = o.split(",")[2],
                                        p = parseInt(u.split(".")[0].replace("M", ""), 10);
                                    d.setMonth(p - 1);
                                    var h = parseInt(u.split(".")[1], 10), f = parseInt(u.split(".")[2].split("/")[0]),
                                        I = parseInt(u.split(".")[2].split("/")[1].split(":")[0], 10);
                                    d.setHours(I);
                                    for (var P = 0, m = 0, g = 1; g <= 31 && (d.setDate(g), d.getMonth() === p - 1) && (d.getDay() != f || (m = g, ++P != h)); g++) ;
                                    d.setDate(m), d.setMonth(p - 1);
                                    var S = parseInt(l.split(".")[0].replace("M", ""), 10);
                                    c.setMonth(S - 1);
                                    var y = parseInt(l.split(".")[1], 10), v = parseInt(l.split(".")[2].split("/")[0]),
                                        x = parseInt(l.split(".")[2].split("/")[1].split(":")[0], 10);
                                    c.setHours(x), P = 0, m = 0;
                                    for (g = 1; g <= 31 && (c.setDate(g), c.getMonth() === S - 1) && (c.getDay() != v || (m = g, ++P != y)); g++) ;
                                    if (c.setDate(m), c.setMonth(S - 1), d.getTime() < c.getTime()) {
                                        if (i.getTime() >= d.getTime() && i.getTime() <= c.getTime()) {
                                            var C = o.substring(a + 3, a + 11);
                                            s = 60 * parseInt(C.split(":")[0], 10) + parseInt(C.split(":")[1], 10)
                                        }
                                    } else if (i.getTime() >= d.getTime() || i.getTime() <= c.getTime()) {
                                        C = o.substring(a + 3, a + 11);
                                        s = 60 * parseInt(C.split(":")[0], 10) + parseInt(C.split(":")[1], 10)
                                    }
                                }
                                var T = o.match(/\D+([+-])(\d+):(\d+):(\d+)/);
                                if (5 == T.length) {
                                    var D = (new Date).getTimezoneOffset(), w = 60 * parseInt(T[2]) + parseInt(T[3]);
                                    w = "+" === T[1] ? w : -w, iDeviceMinusLocalTime = 60 * (D - w + s) * 1e3
                                }
                                e.iDeviceMinusLocalTime = iDeviceMinusLocalTime, t(iDeviceMinusLocalTime)
                            }
                        }, error: () => {
                            n()
                        }
                    };
                    c.I_SendHTTPRequest(e.szDeviceIdentify, a.CGI.time, r)
                }))
            }, q.prototype.getAnalogChannelInfo = function (e, n) {
                return new Promise((function (r, i) {
                    var o = {};
                    d.extend(o, n), d.extend(o, {
                        success: function (i) {
                            var o = [];
                            o.push("<VideoInputChannelList>");
                            var s = t.$XML(i).find("VideoInputChannel", !0);
                            e.iAnalogChannelNum = s.length;
                            for (var a = 0, c = s.length; a < c; a++) {
                                var u = s[a];
                                o.push("<VideoInputChannel>"), o.push("<id>" + t.$XML(u).find("id").eq(0).text() + "</id>"), o.push("<inputPort>" + t.$XML(u).find("inputPort").eq(0).text() + "</inputPort>"), o.push("<name>" + d.escape(t.$XML(u).find("name").eq(0).text()) + "</name>"), o.push("<videoFormat>" + t.$XML(u).find("videoFormat").eq(0).text() + "</videoFormat>"), o.push("</VideoInputChannel>")
                            }
                            o.push("</VideoInputChannelList>");
                            var l = d.loadXML(o.join(""));
                            n.success && n.success(l), r(l)
                        }, error: function (e) {
                            n.error && n.error(e), i(e)
                        }
                    }), c.I_SendHTTPRequest(e.szDeviceIdentify, a.CGI.getAnalogChannelInfo, o)
                }))
            }, q.prototype.getDigitalChannel = function (e, n) {
                return new Promise((function (r, i) {
                    var o = {};
                    d.extend(o, n), d.extend(o, {
                        success: function (e) {
                            var i = [];
                            i.push("<InputProxyChannelList>");
                            for (var o = t.$XML(e).find("InputProxyChannel", !0), s = 0, a = o.length; s < a; s++) {
                                var c = o[s];
                                i.push("<InputProxyChannel>"), i.push("<id>" + t.$XML(c).find("id").eq(0).text() + "</id>"), i.push("<name>" + d.escape(t.$XML(c).find("name").eq(0).text()) + "</name>"), i.push("</InputProxyChannel>")
                            }
                            i.push("</InputProxyChannelList>");
                            var u = d.loadXML(i.join(""));
                            n.success && n.success(u), r(u)
                        }, error: function (e) {
                            n.error && n.error(e), i(e)
                        }
                    }), c.I_SendHTTPRequest(e.szDeviceIdentify, a.CGI.getDigitalChannel, o)
                }))
            }, q.prototype.getDigitalChannelInfo = function (e, n) {
                return new Promise((async (r, i) => {
                    var o = null, s = {};
                    try {
                        o = await a.getDigitalChannel(e, {})
                    } catch (e) {
                        i(e)
                    }
                    for (var u = t.$XML(o).find("InputProxyChannel", !0), l = 0, p = u.length; l < p; l++) {
                        var h = u[l], f = t.$XML(h).find("id").eq(0).text(), I = t.$XML(h).find("name").eq(0).text();
                        s[f] = I
                    }
                    var P = {};
                    d.extend(P, n), d.extend(P, {
                        success: function (e) {
                            var i = [];
                            i.push("<InputProxyChannelStatusList>");
                            for (var o = t.$XML(e).find("InputProxyChannelStatus", !0), a = 0, c = o.length; a < c; a++) {
                                var u = o[a], l = t.$XML(u).find("id").eq(0).text();
                                i.push("<InputProxyChannelStatus>"), i.push("<id>" + l + "</id>"), i.push("<sourceInputPortDescriptor>"), i.push("<proxyProtocol>" + t.$XML(u).find("proxyProtocol").eq(0).text() + "</proxyProtocol>"), i.push("<addressingFormatType>" + t.$XML(u).find("addressingFormatType").eq(0).text() + "</addressingFormatType>"), i.push("<ipAddress>" + t.$XML(u).find("ipAddress").eq(0).text() + "</ipAddress>"), i.push("<managePortNo>" + t.$XML(u).find("managePortNo").eq(0).text() + "</managePortNo>"), i.push("<srcInputPort>" + t.$XML(u).find("srcInputPort").eq(0).text() + "</srcInputPort>"), i.push("<userName>" + d.escape(t.$XML(u).find("userName").eq(0).text()) + "</userName>"), i.push("<streamType>" + t.$XML(u).find("streamType").eq(0).text() + "</streamType>"), i.push("<online>" + t.$XML(u).find("online").eq(0).text() + "</online>"), i.push("<name>" + d.escape(s[l]) + "</name>"), i.push("</sourceInputPortDescriptor>"), i.push("</InputProxyChannelStatus>")
                            }
                            i.push("</InputProxyChannelStatusList>");
                            var p = d.loadXML(i.join(""));
                            n.success && n.success(p), r(p)
                        }, error: function (e) {
                            n.error && n.error(e), i(e)
                        }
                    }), c.I_SendHTTPRequest(e.szDeviceIdentify, a.CGI.getDigitalChannelInfo, P)
                }))
            }, q.prototype.getZeroChannelInfo = function (e, t) {
                return c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.getZeroChannelInfo, t)
            }, q.prototype.getStreamChannels = function (e, t) {
                if (0 != e.iAnalogChannelNum) d.formatString(this.CGI.getStreamChannels.analog, e.szHttpProtocol, e.szIP, e.iCGIPort); else d.formatString(this.CGI.getStreamChannels.digital, e.szHttpProtocol, e.szIP, e.iCGIPort);
                let n;
                return n = 0 != e.iAnalogChannelNum ? this.CGI.getStreamChannels.analog : this.CGI.getStreamChannels.digital, c.I_SendHTTPRequest(e.szDeviceIdentify, n, t)
            }, q.prototype.getPPPoEStatus = function (e, t) {
                return c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.getPPPoEStatus, t)
            }, q.prototype.getUPnPPortStatus = function (e, t) {
                return c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.getUPnPPortStatus, t)
            }, q.prototype.getNetworkBond = function (e, t) {
                return c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.getNetworkBond, t)
            }, q.prototype.getNetworkInterface = function (e, t) {
                return c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.getNetworkInterface, t)
            }, q.prototype.getPortInfo = function (e, t) {
                return c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.getPortInfo, t)
            }, q.prototype.startRealPlay = function (e, t) {
                return new Promise((async function (r, i) {
                    var o = 100 * t.iChannelID + t.iStreamType, a = "", c = d.delPort(e.szIP), l = e.iRtspPort;
                    t.iPort && (l = t.iPort), a = t.bZeroChannel ? d.formatString(e.oProtocolInc.CGI.startRealPlay.zeroChannels, c, l) : d.formatString(e.oProtocolInc.CGI.startRealPlay.channels, c, l, o);
                    await n.JS_SetSecretKey(0, u.secretKey, 1), console.log(11111, a), n.JS_Play(a, {
                        auth: e.szAuth,
                        userInfo: e.szAuth
                    }, t.iWndIndex, "", "", t.bFlag).then((() => {
                        var n;
                        (n = new A).iIndex = t.iWndIndex, n.szIP = e.szIP, n.iCGIPort = e.iCGIPort, n.szDeviceIdentify = e.szDeviceIdentify, n.iChannelID = t.iChannelID, n.iPlayStatus = 1, s.push(n), r()
                    }), (() => {
                        i()
                    }))
                }))
            }, q.prototype.startPlay = function (e, t) {
                return new Promise((async function (r, i) {
                    n.JS_Play(t.szUrl, {
                        auth: e.szAuth,
                        userInfo: e.szAuth
                    }, t.iWndIndex, t.startTime, t.endTime, !0).then((() => {
                        var n;
                        (n = new A).iIndex = t.iWndIndex, n.szIP = e.szIP, n.szDeviceIdentify = e.szDeviceIdentify, n.iPlayStatus = 2, s.push(n), r()
                    }), (() => {
                        i()
                    }))
                }))
            }, q.prototype.startVoiceTalk = function (e, t) {
                var r = d.formatString(this.CGI.startVoiceTalk.open, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                    i = d.formatString(this.CGI.startVoiceTalk.close, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                    o = d.formatString(this.CGI.startVoiceTalk.audioData, e.szHttpProtocol, e.szIP, e.iCGIPort, t);
                return n.JS_StartTalk(r, i, o, e.szAuth, e.iAudioType, e.m_iAudioBitRate, e.m_iAudioSamplingRate, e.m_iSoundChan, e.m_iDeviceAudioSoundChan)
            }, q.prototype.audioPlay = function (e) {
                return n.JS_AudioPlay(e.szUrl, e.szAuth, -1, -1, !0, e.iAudioType)
            }, q.prototype.ptzAutoControl = function (e, t, n, r) {
                return new Promise(((i, o) => {
                    var s = n.iChannelID;
                    r.iPTZSpeed = r.iPTZSpeed < 7 ? 15 * r.iPTZSpeed : 100, t && (r.iPTZSpeed = 0);
                    var u = {
                        type: "PUT",
                        url: s <= e.iAnalogChannelNum ? d.formatString(a.CGI.ptzAutoControl.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID) : d.formatString(a.CGI.ptzAutoControl.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID),
                        data: "<?xml version='1.0' encoding='UTF-8'?><autoPanData><autoPan>" + r.iPTZSpeed + "</autoPan></autoPanData>",
                        success: null,
                        error: null
                    };
                    d.extend(u, r), d.extend(u, {
                        success: function () {
                            n.bPTZAuto = !n.bPTZAuto, r.success && r.success(), i()
                        }, error: function (e) {
                            r.error && r.error(e), o(e)
                        }
                    }), c.I_SendHTTPRequest(e.szDeviceIdentify, "", u)
                }))
            }, q.prototype.ptzControl = function (e, t, n, r) {
                var i = n.iChannelID;
                n.bPTZAuto && this.ptzAutoControl(e, !0, n, {iPTZSpeed: 0}), r.iPTZSpeed = t ? 0 : r.iPTZSpeed < 7 ? 15 * r.iPTZSpeed : 100;
                var o = [{}, {pan: 0, tilt: r.iPTZSpeed}, {pan: 0, tilt: -r.iPTZSpeed}, {
                        pan: -r.iPTZSpeed,
                        tilt: 0
                    }, {pan: r.iPTZSpeed, tilt: 0}, {pan: -r.iPTZSpeed, tilt: r.iPTZSpeed}, {
                        pan: -r.iPTZSpeed,
                        tilt: -r.iPTZSpeed
                    }, {pan: r.iPTZSpeed, tilt: r.iPTZSpeed}, {
                        pan: r.iPTZSpeed,
                        tilt: -r.iPTZSpeed
                    }, {}, {speed: r.iPTZSpeed}, {speed: -r.iPTZSpeed}, {speed: r.iPTZSpeed}, {speed: -r.iPTZSpeed}, {speed: r.iPTZSpeed}, {speed: -r.iPTZSpeed}],
                    s = "", a = {};
                switch (r.iPTZIndex) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        a = this.CGI.ptzControl, s = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + o[r.iPTZIndex].pan + "</pan><tilt>" + o[r.iPTZIndex].tilt + "</tilt></PTZData>";
                        break;
                    case 10:
                    case 11:
                        a = this.CGI.ptzControl, s = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + o[r.iPTZIndex].speed + "</zoom></PTZData>";
                        break;
                    case 12:
                    case 13:
                        a = this.CGI.ptzFocus, s = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + o[r.iPTZIndex].speed + "</focus></FocusData>";
                        break;
                    case 14:
                    case 15:
                        a = this.CGI.ptzIris, s = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + o[r.iPTZIndex].speed + "</iris></IrisData>";
                        break;
                    default:
                        return
                }
                var u = {
                    type: "PUT",
                    url: i <= e.iAnalogChannelNum ? d.formatString(a.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID) : d.formatString(a.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID),
                    data: s,
                    success: null,
                    error: null
                };
                return d.extend(u, r), c.I_SendHTTPRequest(e.szDeviceIdentify, "", u)
            }, q.prototype.setPreset = function (e, t, n) {
                var r = "", i = "";
                r = t.iChannelID <= e.iAnalogChannelNum ? d.formatString(this.CGI.setPreset.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID) : d.formatString(this.CGI.setPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID), i = "<?xml version='1.0' encoding='UTF-8'?>", i += "<PTZPreset>", i += "<id>" + n.iPresetID + "</id>", e.szDeviceType != p && (i += "<presetName>Preset" + n.iPresetID + "</presetName>");
                var o = {type: "PUT", url: r, data: i += "</PTZPreset>", success: null, error: null};
                return d.extend(o, n), c.I_SendHTTPRequest(e.szDeviceIdentify, "", o)
            }, q.prototype.goPreset = function (e, t, n) {
                var r = {
                    type: "PUT",
                    url: t.iChannelID <= e.iAnalogChannelNum ? d.formatString(this.CGI.goPreset.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID) : d.formatString(this.CGI.goPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID),
                    success: null,
                    error: null
                };
                return d.extend(r, n), c.I_SendHTTPRequest(e.szDeviceIdentify, "", r)
            }, q.prototype.recordSearch = function (e, n) {
                return new Promise(((r, i) => {
                    var o, s, u = n.iChannelID, l = n.iStreamType, p = n.szStartTime.replace(" ", "T") + "Z",
                        h = n.szEndTime.replace(" ", "T") + "Z";
                    o = d.formatString(a.CGI.recordSearch, e.szHttpProtocol, e.szIP, e.iCGIPort), s = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new B + "</searchID><trackIDList><trackID>" + (100 * u + l) + "</trackID></trackIDList><timeSpanList><timeSpan><startTime>" + p + "</startTime><endTime>" + h + "</endTime></timeSpan></timeSpanList><maxResults>50</maxResults><searchResultPostion>" + n.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.ISAPI.org/VideoMotion</metadataDescriptor></metadataList></CMSearchDescription>";
                    new R;
                    var f = {type: "POST", url: o, data: s, success: null, error: null};
                    d.extend(f, n), d.extend(f, {
                        success: function (e) {
                            var i = [];
                            i.push("<CMSearchResult>"), i.push("<responseStatus>" + t.$XML(e).find("responseStatus").eq(0).text() + "</responseStatus>"), i.push("<responseStatusStrg>" + t.$XML(e).find("responseStatusStrg").eq(0).text() + "</responseStatusStrg>"), i.push("<numOfMatches>" + t.$XML(e).find("numOfMatches").eq(0).text() + "</numOfMatches>"), i.push("<matchList>");
                            for (var o = t.$XML(e).find("searchMatchItem", !0), s = 0, a = o.length; s < a; s++) {
                                var c = o[s];
                                i.push("<searchMatchItem>"), i.push("<trackID>" + t.$XML(c).find("trackID").eq(0).text() + "</trackID>"), i.push("<startTime>" + t.$XML(c).find("startTime").eq(0).text() + "</startTime>"), i.push("<endTime>" + t.$XML(c).find("endTime").eq(0).text() + "</endTime>"), i.push("<playbackURI>" + d.escape(t.$XML(c).find("playbackURI").eq(0).text()) + "</playbackURI>"), i.push("<metadataDescriptor>" + t.$XML(c).find("metadataDescriptor").eq(0).text().split("/")[1] + "</metadataDescriptor>"), i.push("</searchMatchItem>"), console.log(d.escape(t.$XML(c).find("playbackURI").eq(0).text()))
                            }
                            i.push("</matchList>"), i.push("</CMSearchResult>"), e = d.loadXML(i.join("")), n.success && n.success(e), r(e)
                        }, error: function (e) {
                            n.error && n.error(e), i(e)
                        }
                    }), c.I_SendHTTPRequest(e.szDeviceIdentify, "", f)
                }))
            }, q.prototype.startPlayback = function (e, t) {
                return new Promise((async function (r, i) {
                    var o, a = t.iWndIndex, c = t.szStartTime, u = t.szEndTime, l = d.delPort(e.szIP), p = e.iRtspPort;
                    if (t.iPort && (p = t.iPort), o = d.formatString(t.cgi, l, p, t.iChannelID), !d.isUndefined(t.oTransCodeParam)) {
                        var h = function (e) {
                            var t = {TransFrameRate: "", TransResolution: "", TransBitrate: ""};
                            if (d.extend(t, e), "" == t.TransFrameRate || "" == t.TransResolution || "" == t.TransBitrate) return "";
                            var n = [];
                            return n.push("<?xml version='1.0' encoding='UTF-8'?>"), n.push("<CompressionInfo>"), n.push("<TransFrameRate>" + t.TransFrameRate + "</TransFrameRate>"), n.push("<TransResolution>" + t.TransResolution + "</TransResolution>"), n.push("<TransBitrate>" + t.TransBitrate + "</TransBitrate>"), n.push("</CompressionInfo>"), n.join("")
                        }(t.oTransCodeParam);
                        if ("" == h) return -1;
                        n.JS_SetTrsPlayBackParam(a, h)
                    }
                    n.JS_Play(o, {auth: e.szAuth, userInfo: e.szAuth}, a, c, u, t.bFlag).then((() => {
                        var n;
                        (n = new A).iIndex = a, n.szIP = e.szIP, n.iCGIPort = e.iCGIPort, n.szDeviceIdentify = e.szDeviceIdentify, n.iChannelID = t.iChannelID, n.iPlayStatus = 2, s.push(n), r()
                    }), (() => {
                        i()
                    }))
                }))
            }, q.prototype.reversePlayback = function (e, t) {
                return new Promise((function (r, i) {
                    var o = t.iWndIndex, a = t.szStartTime, c = t.szEndTime, u = d.delPort(e.szIP), l = e.iRtspPort;
                    t.iPort && (l = t.iPort);
                    var p = d.formatString(t.cgi, u, l, t.iChannelID);
                    n.JS_ReversePlay(p, {auth: e.szAuth, userInfo: e.szAuth}, o, a, c).then((() => {
                        var n = new A;
                        n.iIndex = o, n.szIP = e.szIP, n.iCGIPort = e.iCGIPort, n.szDeviceIdentify = e.szDeviceIdentify, n.iChannelID = t.iChannelID, n.iPlayStatus = 5, s.push(n), r()
                    }), (() => {
                        i()
                    }))
                }))
            }, q.prototype.startDownloadRecord = function (e, t) {
                var r = d.formatString(this.CGI.startDownloadRecord, e.szHttpProtocol, e.szIP, e.iCGIPort),
                    i = "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI>" + d.escape(t.szPlaybackURI) + "</playbackURI></downloadRequest>";
                return n.JS_StartAsyncDownload(r, e.szAuth, t.szFileName, i, t.bDateDir)
            }, q.prototype.exportDeviceConfig = function (e) {
                var t = d.formatString(this.CGI.downloaddeviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                return n.JS_DownloadFile(t, e.szAuth, "", 0)
            }, q.prototype.importDeviceConfig = function (e, t) {
                var r = d.formatString(this.CGI.uploaddeviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                return n.JS_StartAsynUpload(r, "", e.szAuth, t.szFileName, 0)
            }, q.prototype.restart = function (e, t) {
                var n = {type: "PUT", success: null, error: null};
                return d.extend(n, t), c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.restart, n)
            }, q.prototype.restore = function (e, t, n) {
                var r = {
                    type: "PUT",
                    url: d.formatString(this.CGI.restore, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                    success: null,
                    error: null
                };
                return c.I_SendHTTPRequest(e.szDeviceIdentify, "", r)
            }, q.prototype.startUpgrade = function (e, t) {
                var r = d.formatString(this.CGI.startUpgrade.upgrade, e.szHttpProtocol, e.szIP, e.iCGIPort);
                d.formatString(this.CGI.startUpgrade.status, e.szHttpProtocol, e.szIP, e.iCGIPort);
                return n.JS_StartUpgrade(r, "", e.szAuth, t)
            }, q.prototype.set3DZoom = function (e, t, n, r) {
                var i = "";
                i = t.iChannelID <= e.iAnalogChannelNum ? d.formatString(this.CGI.set3DZoom.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID) : d.formatString(this.CGI.set3DZoom.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID), 0 !== n[0][0] || 0 !== n[0][1] || 0 === n[2][0] && 0 === n[2][1] || (n[0][0] = n[2][0], n[0][1] = n[2][1]);
                var o = "<?xml version='1.0' encoding='UTF-8'?><Position3D><StartPoint><positionX>" + parseInt(255 * n[0][0], 10) + "</positionX><positionY>" + (255 - parseInt(255 * n[0][1], 10)) + "</positionY></StartPoint><EndPoint><positionX>" + parseInt(255 * n[2][0], 10) + "</positionX><positionY>" + (255 - parseInt(255 * n[2][1], 10)) + "</positionY></EndPoint></Position3D>",
                    s = (new R, {type: "PUT", url: i, data: o, success: null, error: null});
                return d.extend(s, r), c.I_SendHTTPRequest(e.szDeviceIdentify, "", s)
            }, q.prototype.getSDKCapa = function (e, t) {
                return c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.SDKCapabilities, t)
            }, q.prototype.deviceCapturePic = function (e, t, n, r) {
                t = 100 * t + 1;
                var i, o = d.formatString(this.CGI.deviceCapture.channels, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                    s = [];
                d.isInt(r.iResolutionWidth) && s.push("videoResolutionWidth=" + r.iResolutionWidth), d.isInt(r.iResolutionHeight) && s.push("videoResolutionHeight=" + r.iResolutionHeight), s.length > 0 && (o += "?" + s.join("&"));
                return i = function (e, t) {
                    return $("body").append('<a id="jsplugin_download_a" href="' + e + '" download=' + t + '.jpg><li id="jsplugin_download_li"></li></a>'), $("#jsplugin_download_li").trigger("click"), $("#jsplugin_download_a").remove(), 0
                }(o, n), i
            }, q.prototype.digestLogin = function (e, t, n, r, i, o, s) {
                var a = "";
                a = 2 == t ? "https://" : "http://";
                var u = {
                    type: "GET",
                    url: d.formatString(this.CGI.login, a, e, n),
                    auth: s ? d.Base64.encode(r + ":" + i) : d.Base64.encode(":" + r + ":" + i),
                    success: null,
                    error: null
                }, l = e + "_" + n;
                return d.extend(u, o), c.I_SendHTTPRequest(l, "", u)
            }, q.prototype.getSystemCapa = function (e, t) {
                return c.I_SendHTTPRequest(e.szDeviceIdentify, this.CGI.systemCapabilities, t)
            }, L = this, (W = function (e) {
                this.elems = [], this.length = 0, this.length = this.elems.push(e)
            }).prototype.find = function (e, t) {
                var n = this.elems[this.length - 1] ? this.elems[this.length - 1].getElementsByTagName(e) : [];
                return this.length = this.elems.push(n), t ? n : this
            }, W.prototype.eq = function (e, t) {
                var n = this.elems[this.length - 1].length, r = null;
                return n > 0 && e < n && (r = this.elems[this.length - 1][e]), this.length = this.elems.push(r), t ? r : this
            }, W.prototype.text = function (e) {
                return this.elems[this.length - 1] ? e ? void (window.DOMParser ? this.elems[this.length - 1].textContent = e : this.elems[this.length - 1].text = e) : window.DOMParser ? this.elems[this.length - 1].textContent : this.elems[this.length - 1].text : ""
            }, W.prototype.attr = function (e) {
                if (this.elems[this.length - 1]) {
                    var t = this.elems[this.length - 1].attributes.getNamedItem(e);
                    return t ? t.value : ""
                }
            }, L.$XML = function (e) {
                return new W(e)
            };
            var G = function () {
            };

            function B() {
                this.id = this.createUUID()
            }

            return G.prototype.extend = function () {
                for (var e, t = arguments[0] || {}, n = 1, r = arguments.length; n < r; n++) if (null != (e = arguments[n])) for (var i in e) {
                    t[i];
                    var o = e[i];
                    t !== o && ("object" == typeof o ? t[i] = this.extend({}, o) : void 0 !== o && (t[i] = o))
                }
                return t
            }, G.prototype.browser = function () {
                var e = navigator.userAgent.toLowerCase(),
                    t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(safari)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || /(trident.*rv:)([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(e) || ["unknow", "0"];
                t.length > 0 && t[1].indexOf("trident") > -1 && (t[1] = "msie");
                var n = {};
                return n[t[1]] = !0, n.version = t[2], n
            }, G.prototype.loadXML = function (e) {
                if (null == e || "" == e) return null;
                var t = null;
                window.DOMParser ? t = (new DOMParser).parseFromString(e, "text/xml") : ((t = new ActiveXObject("Microsoft.XMLDOM")).async = !1, t.loadXML(e));
                return t
            }, G.prototype.toXMLStr = function (e) {
                var t = "";
                try {
                    t = (new XMLSerializer).serializeToString(e)
                } catch (n) {
                    try {
                        t = e.xml
                    } catch (e) {
                        return ""
                    }
                }
                return -1 == t.indexOf("<?xml") && (t = "<?xml version='1.0' encoding='utf-8'?>" + t), t
            }, G.prototype.escape = function (e) {
                return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e
            }, G.prototype.dateFormat = function (e, t) {
                var n = {
                    "M+": e.getMonth() + 1,
                    "d+": e.getDate(),
                    "h+": e.getHours(),
                    "m+": e.getMinutes(),
                    "s+": e.getSeconds(),
                    "q+": Math.floor((e.getMonth() + 3) / 3),
                    S: e.getMilliseconds()
                };
                for (var r in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), n) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
                return t
            }, G.prototype.Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
                    var t, n, r, i, o, s, a, d = "", c = 0;
                    for (e = G.prototype.Base64._utf8_encode(e); c < e.length;) i = (t = e.charCodeAt(c++)) >> 2, o = (3 & t) << 4 | (n = e.charCodeAt(c++)) >> 4, s = (15 & n) << 2 | (r = e.charCodeAt(c++)) >> 6, a = 63 & r, isNaN(n) ? s = a = 64 : isNaN(r) && (a = 64), d = d + this._keyStr.charAt(i) + this._keyStr.charAt(o) + this._keyStr.charAt(s) + this._keyStr.charAt(a);
                    return d
                }, decode: function (e) {
                    var t, n, r, i, o, s, a = "", d = 0;
                    for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < e.length;) t = this._keyStr.indexOf(e.charAt(d++)) << 2 | (i = this._keyStr.indexOf(e.charAt(d++))) >> 4, n = (15 & i) << 4 | (o = this._keyStr.indexOf(e.charAt(d++))) >> 2, r = (3 & o) << 6 | (s = this._keyStr.indexOf(e.charAt(d++))), a += String.fromCharCode(t), 64 != o && (a += String.fromCharCode(n)), 64 != s && (a += String.fromCharCode(r));
                    return a = G.prototype.Base64._utf8_decode(a)
                }, _utf8_encode: function (e) {
                    e = e.replace(/\r\n/g, "\n");
                    for (var t = "", n = 0; n < e.length; n++) {
                        var r = e.charCodeAt(n);
                        r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(63 & r | 128))
                    }
                    return t
                }, _utf8_decode: function (e) {
                    for (var t = "", n = 0, r = c1 = c2 = 0; n < e.length;) (r = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(r), n++) : r > 191 && r < 224 ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((31 & r) << 6 | 63 & c2), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
                    return t
                }
            }, G.prototype.createEventScript = function (e, t, n) {
                var r = document.createElement("script");
                r.htmlFor = e, r.event = t, r.innerHTML = n, document.body.parentNode.appendChild(r)
            }, G.prototype.isInt = function (e) {
                return /^\d+$/.test(e)
            }, G.prototype.getDirName = function () {
                var t = "";
                if ("" !== e.szBasePath) t = e.szBasePath; else {
                    var n = /[^?#]*\//, r = document.getElementById("videonode");
                    if (r) t = r.src.match(n)[0]; else {
                        for (var i = document.scripts, o = 0, s = i.length; o < s; o++) if (i[o].src.indexOf("webVideoCtrl.js") > -1) {
                            r = i[o];
                            break
                        }
                        r && (t = r.src.match(n)[0])
                    }
                }
                return t
            }, G.prototype.loadScript = function (e, t) {
                var n = document.createElement("script");
                n.type = "text/javascript", n.onload = function () {
                    t()
                }, n.src = e, document.getElementsByTagName("head")[0].appendChild(n)
            }, G.prototype.cookie = function (e, t, n) {
                if (arguments.length > 1 && (null === t || "object" != typeof t)) {
                    if (n = this.extend({}, n), null === t && (n.expires = -1), "number" == typeof n.expires) {
                        var r = n.expires, i = n.expires = new Date;
                        i.setDate(i.getDate() + r)
                    }
                    return document.cookie = [encodeURIComponent(e), "=", n.raw ? String(t) : encodeURIComponent(String(t)), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "; path=/", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("")
                }
                var o, s = (n = t || {}).raw ? function (e) {
                    return e
                } : decodeURIComponent;
                return (o = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? s(o[1]) : null
            }, G.prototype.isUndefined = function (e) {
                return void 0 === e
            }, G.prototype.isObject = function (e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            }, G.prototype.delPort = function (e) {
                var t = e.indexOf(":");
                return t > -1 ? e.substring(0, t) : e
            }, G.prototype.formatString = function () {
                for (var e = arguments[0], t = 1; t < arguments.length; t++) e = e.replace("%s", arguments[t]);
                return e
            }, G.prototype.encodeString = function (e) {
                return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
            }, G.prototype.formatPolygonXmlToJson = function (e) {
                var t, n = this.loadXML(e), r = [], i = [], o = [], s = [], a = [];

                function d(e) {
                    var t = parseInt(e, 10).toString(16);
                    return (t = "0" + t).substring(t.length - 2)
                }

                return $(n).find("SnapPolygon").each((function () {
                    var e = parseInt($(this).find("EditType, editType").text(), 10) || 0,
                        n = "true" === $(this).find("isClosed").text(),
                        c = parseInt($(this).find("polygonType").text(), 10),
                        u = parseFloat($(this).find("showSquare").text()) || 0,
                        l = $(this).find("tips").text() || $(this).find("Tips").text(),
                        p = parseInt($(this).find("tipsPos").text(), 10) || 0,
                        h = "true" === $(this).find("showWH").text(),
                        f = "#" + d($(this).find("r").text()) + d($(this).find("g").text()) + d($(this).find("b").text()),
                        I = parseInt($(this).find("PointNumMax").text(), 10) - 1,
                        P = parseInt($(this).find("MinClosed").text(), 10) - 1,
                        m = parseInt($(this).find("id").text(), 10),
                        g = parseInt($(this).find("RedrawMode").text(), 10) || 0;
                    0 === $(this).find("pointList").find("point").length ? 1 === c ? s.push({
                        id: m,
                        tips: l,
                        drawColor: f,
                        translucent: .1,
                        maxShapeSupport: 1,
                        maxPointSupport: I,
                        minPointSupport: P,
                        showWH: h,
                        redrawMode: g
                    }) : 0 === c && a.push({
                        id: m,
                        tips: l,
                        drawColor: f,
                        translucent: .1,
                        widthHeightRate: u,
                        maxShapeSupport: 1,
                        type: 1,
                        redrawMode: g,
                        tipsPos: p
                    }) : (i = [], $(this).find("pointList").find("point").each((function () {
                        i.push([parseFloat($(this).find("x").text()), parseFloat($(this).find("y").text())])
                    })), t = {
                        id: m,
                        editType: e,
                        points: i,
                        closed: n,
                        tips: l,
                        drawColor: f,
                        maxPointSupport: I,
                        minPointSupport: P,
                        translucent: .1,
                        redrawMode: g
                    }, 1 === c ? (t.showWH = h, r.push(t)) : 0 === c && (t.widthHeightRate = u, t.type = 1, t.tipsPos = p, o.push(t)))
                })), {aRect: o, aPolygon: r, aAddRect: a, aAddPolygon: s}
            }, G.prototype.formatPolygonJsonToXml = function (e) {
                function t(e) {
                    var t = e.toLowerCase();
                    if (t && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) {
                        var n;
                        if (4 === t.length) {
                            var r = "#";
                            for (n = 1; n < 4; n += 1) r += t.slice(n, n + 1).concat(t.slice(n, n + 1));
                            t = r
                        }
                        var i = [];
                        for (n = 1; n < 7; n += 2) i.push(parseInt("0x" + t.slice(n, n + 2), 16));
                        return i
                    }
                    return [0, 0, 0]
                }

                var n = e[0], r = e[1], i = "<?xml version='1.0' encoding='utf-8'?><SnapPolygonList>";
                return $.each(n, (function (e, n) {
                    var r = [0, 0, 0];
                    r = n.drawColor ? t(n.drawColor) : t("#FF0000"), i += "<SnapPolygon>", i += "<id>" + n.id + "</id>", n.tips ? i += "<tips>" + n.tips + "</tips>" : i += "<tips></tips>", i += "<isClosed>" + n.closed.toString() + "</isClosed>", i += "<color><r>" + r[0] + "</r><g>" + r[1] + "</g><b>" + r[2] + "</b></color>", i += "<polygonType>1</polygonType>", i += "<PointNumMax>" + (n.pointNumMax ? n.pointNumMax : 10) + "</PointNumMax>", i += "<MinClosed>" + (n.minClosed ? n.minClosed : 4) + "</MinClosed>", i += "<pointList>", $.each(n.points, (function (e, t) {
                        i += "<point><x>" + t[0] + "</x><y>" + t[1] + "</y></point>"
                    })), i += "</pointList>", i += "</SnapPolygon>"
                })), $.each(r, (function (e, n) {
                    var r = [0, 0, 0];
                    r = n.drawColor ? t(n.drawColor) : t("#FF0000"), i += "<SnapPolygon>", i += "<id>" + n.id + "</id>", i += "<color><r>" + r[0] + "</r><g>" + r[1] + "</g><b>" + r[2] + "</b></color>", i += "<polygonType>0</polygonType>", n.tips ? i += "<tips>" + n.tips + "</tips>" : i += "<tips></tips>", void 0 !== n.closed && null !== n.closed ? i += "<isClosed>" + n.closed.toString() + "</isClosed>" : i += "<isClosed>true</isClosed>", i += "<pointList>";
                    var o = [];
                    if (n.points.length) {
                        var s = 2, a = -1, d = 2, c = -1;
                        $.each(n.points, (function () {
                            s > this[0] && (s = this[0]), d > this[1] && (d = this[1]), a < this[0] && (a = this[0]), c < this[1] && (c = this[1])
                        })), o.push([s, d]), o.push([a, d]), o.push([a, c]), o.push([s, c])
                    }
                    $.each(o, (function (e, t) {
                        i += "<point><x>" + t[0] + "</x><y>" + t[1] + "</y></point>"
                    })), i += "</pointList>", i += "</SnapPolygon>"
                })), i += "</SnapPolygonList>"
            }, G.prototype.convertToUTCTime = function (e, t) {
                void 0 === t && (t = "yyyy-MM-dd hh:mm:ss"), e = e.replace("T", " ").replace("Z", "");
                var n = new Date(Date.parse(e.replace(/-/g, "/")));
                return n = (n = this.utcDateFormat(n, t)).replace(" ", "T")
            }, G.prototype.utcDateFormat = function (e, t) {
                var n = {
                    "M+": e.getUTCMonth() + 1,
                    "d+": e.getUTCDate(),
                    "h+": e.getUTCHours(),
                    "m+": e.getUTCMinutes(),
                    "s+": e.getUTCSeconds(),
                    "q+": Math.floor((e.getUTCMonth() + 3) / 3),
                    S: e.getUTCMilliseconds()
                };
                for (var r in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getUTCFullYear() + "").substr(4 - RegExp.$1.length))), n) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
                return t
            }, G.prototype.convertToLocalTime = function (e, t) {
                void 0 === t && (t = 0);
                var n = (e = e.replace("T", " ").replace("Z", "")).split(" ")[0].split("-"), r = parseInt(n[0], 10),
                    i = parseInt(n[1], 10) - 1, o = parseInt(n[2], 10), s = e.split(" ")[1].split(":"),
                    a = parseInt(s[0], 10), d = parseInt(s[1], 10), c = parseInt(s[2], 10),
                    u = new Date(Date.UTC(r, i, o, a, d, c));
                return u.setTime(u.getTime() + t), this.dateFormat(u, "yyyy-MM-dd hh:mm:ss").replace(" ", "T") + "Z"
            }, B.prototype.valueOf = function () {
                return this.id
            }, B.prototype.toString = function () {
                return this.id
            }, B.prototype.createUUID = function () {
                var e = new Date(1582, 10, 15, 0, 0, 0, 0), t = (new Date).getTime() - e.getTime(), n = "-";
                return B.getIntegerBits(t, 0, 31) + n + B.getIntegerBits(t, 32, 47) + n + (B.getIntegerBits(t, 48, 59) + "1") + n + B.getIntegerBits(B.rand(4095), 0, 7) + B.getIntegerBits(B.rand(4095), 0, 7) + n + (B.getIntegerBits(B.rand(8191), 0, 7) + B.getIntegerBits(B.rand(8191), 8, 15) + B.getIntegerBits(B.rand(8191), 0, 7) + B.getIntegerBits(B.rand(8191), 8, 15) + B.getIntegerBits(B.rand(8191), 0, 15))
            }, B.getIntegerBits = function (e, t, n) {
                var r = B.returnBase(e, 16), i = new Array, o = "", s = 0;
                for (s = 0; s < r.length; s++) i.push(r.substring(s, s + 1));
                for (s = Math.floor(t / 4); s <= Math.floor(n / 4); s++) i[s] && "" != i[s] ? o += i[s] : o += "0";
                return o
            }, B.returnBase = function (e, t) {
                var n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                if (e < t) var r = n[e]; else {
                    var i = "" + Math.floor(e / t), o = e - i * t;
                    if (i >= t) r = this.returnBase(i, t) + n[o]; else r = n[i] + n[o]
                }
                return r
            }, B.rand = function (e) {
                return Math.floor(Math.random() * e)
            }, a = new q, d = new G, this
        }(), t = window.WebVideoCtrl = e;
        t.version = "3.3.0"
    }
}(), "object" == typeof exports && "undefined" != typeof module || ("function" == typeof define && define.amd ? define((function () {
    return WebVideoCtrl
})) : "function" == typeof define && define.cmd && define((function (e, t, n) {
    n.exports = WebVideoCtrl
})));