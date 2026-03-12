function getInfoFnNew(a, b, d) {
    $.ajax({
        url: conf_url + "/ajax/getInfo/",
        type: "POST",
        data: {
            csrf_cyko: global_hash,
            mod: d,
            profil: a
        },
        complete: function(c) {
            c = jQuery.parseJSON(c.responseText);
            if (void 0 === c.main_text || "" === c.main_text) c.main_text = "Aktuell keine weiteren Informationen hinterlegt.";
            $("#info" + b).attr("data-content", '<div class="row text-right"><div class="col-lg-12 text-center"><a  href="#" class="close" data-dismiss="alert">&times;</a></div></div><div><p>' + c.main_text + "</p></div>");
            $("#info" + b).popover({
                html: !0
            });
            $("#info" + b).popover("show")
        },
        beforeSend: function() {}
    });
    window.setTimeout(function() {
        $("body").on("click", function() {
            $("#info" + b).popover("hide")
        })
    }, 0)
}

function getInfoFarbe(a) {
    $("#" + a).popover({
        html: !0
    });
    $("#" + a).popover("show");
    $("body").on("click", function() {
        $("#" + a).popover("hide")
    })
}

function getInfoFarbeOut(a) {
    $("#" + a).popover("hide")
}

function nav_next(a) {
    window.location.href = conf_url + "/" + a
}

function nav_prev(a) {
    window.location.href = conf_url + "/" + a
}

function addWarenkorb() {
    window.parent.postMessage("overlay", "*");
    $(".cartbutton").attr("disabled", "disabled");
    $(".cartbutton").addClass("disabled");
    $(".cartbutton").text("Bitte warten ...");
    $("#btn_sonstiges_prev").addClass("hidden");
    $.ajax({
        url: conf_url + "/ajax/addWarenkorb/",
        type: "POST",
        async: !0,
        data: {
            csrf_cyko: global_hash,
            bereich: !0,
            wk: !0,
            img: obj_konfig.basket_img
        },
        complete: function(a) {
            window.parent.postMessage({
                data: "buy",
                value: a.responseText
            }, "*");
            dataLayer.push({
                event: "configurator",
                configuratorType: "raffstore",
                configuratorStep: "abschluss"
            });
            window.setTimeout(function() {
                $(".cartbutton").removeAttr("disabled");
                $(".cartbutton").removeClass("disabled");
                $(".cartbutton").text("In den Warenkorb legen");
                $("#btn_restart").removeClass("hidden");
                $("#btn_continue").removeClass("hidden");
                $(".cartbutton").addClass("hidden")
            }, 3E3)
        },
        beforeSend: function() {
            window.parent.postMessage("overlay", "*")
        }
    })
}

function do_continue() {
    window.parent.postMessage({
        data: "continue"
    }, "*")
}

function do_restart() {
    obj_konfig = !1;
    window.location.reload()
}

function setBySessionRadioVarValue(a, b) {
    $("input:radio[name=" + a + "][id=" + b + "]").attr("checked", !0)
}

function fktBerechnen(a) {
    $.ajax({
        url: conf_url + "/ajax/berechnen/",
        type: "POST",
        data: {
            csrf_cyko: global_hash,
            tmp_obj: JSON.stringify(a)
        },
        complete: function(b) {
            $("#sidebar_basket").html(b.responseText)
        },
        beforeSend: function() {}
    })
}

function fktToSession(a) {
    $.ajax({
        url: conf_url + "/ajax/setExternTOSession/",
        type: "POST",
        async: !1,
        data: {
            csrf_cyko: global_hash,
            tmp_obj: JSON.stringify(a)
        },
        complete: function(b) {},
        beforeSend: function() {}
    })
}

function setBorder(a, b) {
    a = document.getElementsByClassName(a);
    for (i = 0; i < a.length; i++) a[i].className = a[i].className.replace(" auswahl", "");
    $("#" + b).toggleClass(" auswahl")
}

function getHTMLObjectById(a) {
    return document.getElementById(a)
}

function setMinMax(a) {
    var b = [];
    $.ajax({
        url: conf_url + "/ajax/minmax/",
        type: "POST",
        async: !1,
        data: {
            csrf_cyko: global_hash,
            conf_obj: a,
            flag: "main"
        },
        async: !1,
        complete: function(d) {
            b = jQuery.parseJSON(d.responseText)
        },
        beforeSend: function() {}
    });
    return b
}

function getMinMaxRollladen(a) {
    var b = [];
    $.ajax({
        url: conf_url + "/ajax/minmaxrollladen/",
        type: "POST",
        data: {
            csrf_cyko: global_hash,
            conf_obj: a
        },
        async: !1,
        complete: function(d) {
            b = jQuery.parseJSON(d.responseText)
        },
        beforeSend: function() {}
    });
    return b
};