import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function TopAppBar({ fontFamily }) {
  const headlineExtraBold =
    fontFamily?.headlineExtraBold ?? "Manrope_800ExtraBold";
  const bodySemiBold = fontFamily?.bodySemiBold ?? "Inter_600SemiBold";
  const bodyBold = fontFamily?.bodyBold ?? "Inter_700Bold";

  return (
    <View style={styles.bar}>
      {/* Left: avatar + branding */}
      <View style={styles.left}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuACYosKvDWVl45qLo9y-c3Ik_CtUFj_engWO5InAig8d1xzbIeX-SJGDt9BCJAS7scKaOZ0ZZLu_jl_FN2Wz5A4UpH2_H9qpKjllf4_GdDjkFYO2xBUEPK_VEMOBjRuZqpDEWve2uui5JeSafKSazAM4nYKUqvrJOYKZ8LNzGrcInqH5JkFelK9z0qPaWFFKQT1uhFpACn83kCDHH8o3tFd4uNEUEFlkgFcwgp0LOZmEXtDNtMUISH10I8Mhc_z3HiGMPvcTQnywP2W",
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.brand}>
          {/* Trả lại tên ngân hàng mặc định */}
          <Text
            style={[styles.brandTitle, { fontFamily: headlineExtraBold }]}
            numberOfLines={1}
          >
            Heritage Digital
          </Text>
          <Text style={[styles.brandSubtitle, { fontFamily: bodyBold }]}>
            THE SOVEREIGN TRUST
          </Text>
        </View>
      </View>

      {/* Right: action icons */}
      <View style={styles.right}>
        <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
          <MaterialIcons name="notifications" size={24} color="#003063" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
          <MaterialIcons name="menu" size={24} color="#003063" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    backgroundColor: "rgba(255,255,255,0.8)",
    shadowColor: "rgba(0,27,61,1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 30,
    elevation: 4,
    width: "100%",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  brand: {
    flexDirection: "column",
    flex: 1,
  },
  brandTitle: {
    fontSize: 20, // Trả lại size 20 như file gốc của bạn
    color: "#003063",
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 10,
    color: "rgba(0, 48, 99, 0.6)",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconBtn: {},
});
