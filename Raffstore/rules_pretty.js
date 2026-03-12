function setViewImageBasket(a) {
    $("#raff_view").attr("src", a.images_path + "/" + a.typ + a.fkf + "-" + a.fe + ".jpg");
    $("#raff_view_small").attr("src", a.images_path + "/" + a.typ + a.fkf + "-" + a.fe + ".jpg")
}

function check_modell_by_typ(a) {
    "typ1" == a.typ && ($("#m1").removeClass("collapse"), $("#m2").removeClass("collapse"), $("#m3").addClass("collapse"), $("#m4").addClass("collapse"));
    "typ2" == a.typ && ($("#m1").addClass("collapse"), $("#m2").addClass("collapse"), $("#m3").removeClass("collapse"), $("#m4").removeClass("collapse"))
}

function check_model_by_typ_default(a) {
    "typ1" == a.typ && (a.modell = "modell_1", setBorder("modell", "modell_1"));
    "typ2" == a.typ && (a.modell = "modell_3", setBorder("modell", "modell_3"))
}

function checkMinMaxMasse(a) {
    var b = setMinMax(a);
    if (void 0 == b.data) return !1;
    $("#min_max_breite").html("zul\u00e4ssiger Bereich von " + b.data[0].min_breite + " bis " + b.data[0].max_breite + " mm");
    $("#breite").attr({
        max: b.data[0].max_breite,
        min: b.data[0].min_breite
    });
    var c = parseFloat(a.breite) > parseFloat(b.data[0].min_breite) && parseFloat(a.breite) <= parseFloat(b.data[0].max_breite) ? parseFloat(a.breite) : parseFloat(b.data[0].min_breite);
    $("#breite").val(c);
    a.breite = c;
    $("#min_max_hoehe").html("zul\u00e4ssiger Bereich von " +
        b.data[0].min_hoehe + " bis " + b.data[0].max_hoehe + " mm");
    $("#hoehe").attr({
        max: b.data[0].max_hoehe,
        min: b.data[0].min_hoehe
    });
    b = parseFloat(a.hoehe) > parseFloat(b.data[0].min_hoehe) && parseFloat(a.hoehe) <= parseFloat(b.data[0].max_hoehe) ? parseFloat(a.hoehe) : parseFloat(b.data[0].min_hoehe);
    $("#hoehe").val(b);
    a.hoehe = b
}

function check_aluputzleiste_by_typ(a) {
    "typ1" == a.typ && ($("#putz").addClass("collapse"), $("#apl1").removeClass("collapse"), $("#apl2").addClass("collapse"), $("#apl3").addClass("collapse"));
    "typ2" == a.typ && ($("#putz").removeClass("collapse"), $("#apl1").addClass("collapse"), $("#apl2").removeClass("collapse"), $("#apl3").removeClass("collapse"))
}

function set_apl_by_typ(a) {
    "typ1" == a.typ && (a.apl = "apl_1", setBorder("apl", "apl_1"));
    "typ2" == a.typ && (a.apl = "apl_2", setBorder("apl", "apl_2"))
}

function check_kd_by_typ_modell(a) {
    "typ2" == a.typ && ($("#kd").addClass("collapse"), a.kd = "kd_1", $("#kd_1").prop("checked", !0));
    "typ1" == a.typ && ($("#kd").removeClass("collapse"), "modell_1" == a.modell && ($("#kd1").removeClass("collapse"), $("#kd2").addClass("collapse")), "modell_2" == a.modell && ($("#kd1").addClass("collapse"), $("#kd2").removeClass("collapse")))
}

function check_kd_by_model_default(a) {
    "modell_1" == a.modell && (a.kd = "kd_1", $("#kd_1").prop("checked", !0));
    "modell_2" == a.modell && (a.kd = "kd_3", $("#kd_3").prop("checked", !0))
}

function rules_farben_check_gleich(a) {
    var b = a.fkf + "_i";
    a.fe = b;
    setBorder("fe", b)
}

function check_ada_by_typ(a) {
    "typ1" == a.typ && $("#ada").removeClass("collapse");
    "typ2" == a.typ && ($("#ada").addClass("collapse"), a.ada = "ada_1", $("#ada_1").prop("checked", !0))
}

function check_steuerung_by_antrieb(a) {
    "aa_1" == a.aa ? $("#steuerung").removeClass("collapse") : ($("#steuerung").addClass("collapse"), a.st = "st_0", setBorder("st", "st_0"), a.fst = "fst_0", setBorder("fst", "fst_0"))
}

function check_view_wss_typ(a) {
    "aa_1" == a.aa ? ($("#wss_typ").addClass("collapse"), a.wss = "wss_0", setBorder("wss", "wss_0")) : $("#wss_typ").removeClass("collapse")
}

function check_view_st_typ(a) {
    return !1
}

function check_view_fst_typ(a) {
    return !1
}

function check_ueb_farbe(a) {
    "typ1" == a.typ && ($("#ueb_kasten").html("Farbe F\u00fchrungsschiene"), $("#ueb_lamelle").html("Farbe Lamellen / Endleiste"), $("#farbe_info").html("Hier k\u00f6nnen Sie eine andere Farbe der Lamelle / Endleiste ausw\u00e4hlen. Standard ist die Farben der Lamelle / Endleiste gleich der Farbe der F\u00fchrungsschiene."));
    "typ2" == a.typ && ($("#ueb_kasten").html("Farbe Kasten / F\u00fchrungsschiene"), $("#ueb_lamelle").html("Farbe Lamelle / Endleiste: "), $("#farbe_info").html(" Hier k\u00f6nnen Sie eine andere Farbe der Lamelle / Endleiste ausw\u00e4hlen. Standard ist die Farben der Lamelle / Endleiste gleich der Farbe des Kastens / F\u00fchrungsschiene.."))
};