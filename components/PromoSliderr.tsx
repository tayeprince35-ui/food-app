import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const AUTO_SLIDE_INTERVAL = 4500;

/* -------------------------------------------------------------------------- */
/* ASSETS                                                                     */
/* -------------------------------------------------------------------------- */

const ScooterImage = require("@/assets/icons/container.png");
const DiscountImage = require("@/assets/icons/gift2.png");
const ChefHatImage = require("@/assets/icons/gift.png");

const DOT_COLORS = ["#E63946", "#FF7A00", "#6C4EE3"];

/* -------------------------------------------------------------------------- */
/* SHARED PROMO CARD                                                          */
/* -------------------------------------------------------------------------- */

type PromoCardProps = {
  colors: [string, string, ...string[]];
  badge: string;
  title: string;
  code: string;
  ctaText: string;
  ctaColor: string;
  imageSource: any;
  /** Pixel size the illustration will occupy (square). */
  illustrationSize: number;
};

function PromoCard({
  colors,
  badge,
  title,
  code,
  ctaText,
  ctaColor,
  imageSource,
  illustrationSize,
}: PromoCardProps) {
  return (
    <LinearGradient colors={colors} style={styles.card}>
      {/* Decorative background circles */}
      <View style={[styles.ball, styles.ballTop]} />
      <View style={[styles.ball, styles.ballBottom]} />

      {/* Text column */}
      <View style={styles.textContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.code}>{code}</Text>

        <TouchableOpacity style={styles.cta} activeOpacity={0.8}>
          <Text style={[styles.ctaText, { color: ctaColor }]}>{ctaText} →</Text>
        </TouchableOpacity>
      </View>

      {/* Illustration, sized relative to card */}
      <View style={styles.illustrationContainer}>
        <Image
          source={imageSource}
          style={{ width: illustrationSize, height: illustrationSize }}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}

/* -------------------------------------------------------------------------- */
/* SLIDES                                                                     */
/* -------------------------------------------------------------------------- */

function DeliveryCard({ illustrationSize }: { illustrationSize: number }) {
  return (
    <PromoCard
      colors={["#FF6B4A", "#E63946"]}
      badge="🔥 LIMITED TIME"
      title={`Free delivery\non first order!`}
      code="Use code: HEYBITE1"
      ctaText="Order now"
      ctaColor="#E63946"
      imageSource={ScooterImage}
      illustrationSize={illustrationSize}
    />
  );
}

function DiscountCard({ illustrationSize }: { illustrationSize: number }) {
  return (
    <PromoCard
      colors={["#FFB300", "#FF7A00"]}
      badge="💸 THIS WEEK"
      title={`30% off\norders above ₦5k!`}
      code="Use code: SAVE30"
      ctaText="Grab deal"
      ctaColor="#FF7A00"
      imageSource={DiscountImage}
      illustrationSize={illustrationSize}
    />
  );
}

function NewItemsCard({ illustrationSize }: { illustrationSize: number }) {
  return (
    <PromoCard
      colors={["#6C4EE3", "#9B5CFF"]}
      badge="✨ JUST ADDED"
      title={`New restaurants\nnow on HeyBite!`}
      code="Explore fresh menus"
      ctaText="Browse now"
      ctaColor="#6C4EE3"
      imageSource={ChefHatImage}
      illustrationSize={illustrationSize}
    />
  );
}

const SLIDES = [DeliveryCard, DiscountCard, NewItemsCard];

/* -------------------------------------------------------------------------- */
/* SLIDER                                                                     */
/* -------------------------------------------------------------------------- */

function PromoSlider() {
  const { width } = useWindowDimensions();

  const listRef = useRef<FlatList>(null);
  const indexRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Card interior width after the horizontal cardPadding
  const cardInnerWidth = width - 32;

  // Illustration grows with card width but never dominates the text.
  // 0.30 keeps roughly a 70/30 text-to-image split on every phone size.
  const illustrationSize = Math.max(
    88,
    Math.min(cardInnerWidth * 0.3, 120),
  );

  const goTo = useCallback((i: number) => {
    indexRef.current = i;
    setIndex(i);
    listRef.current?.scrollToIndex({ index: i, animated: true });
  }, []);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      goTo((indexRef.current + 1) % SLIDES.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [paused, goTo]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    indexRef.current = i;
    setIndex(i);
    setPaused(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
        onScrollBeginDrag={() => setPaused(true)}
        onMomentumScrollEnd={onMomentumEnd}
        renderItem={({ item: Slide }) => (
          <View style={{ width }}>
            <View style={styles.cardPadding}>
              <Slide illustrationSize={illustrationSize} />
            </View>
          </View>
        )}
      />

      {/* Pagination */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => goTo(i)} hitSlop={8}>
            <View
              style={[
                styles.dot,
                {
                  width: i === index ? 20 : 8,
                  backgroundColor: i === index ? DOT_COLORS[i] : "#3a3a3a",
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default React.memo(PromoSlider);

/* -------------------------------------------------------------------------- */
/* STYLES                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 20,
  },

  cardPadding: {
    paddingHorizontal: 16,
  },

  card: {
    height: 232,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    zIndex: 2,
    paddingRight: 8,
  },

  illustrationContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    // No negative margins — the illustration lives inside its own column.
  },

  /* Background circles */
  ball: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  ballTop: {
    width: 140,
    height: 140,
    top: -50,
    right: -30,
  },

  ballBottom: {
    width: 100,
    height: 100,
    bottom: -40,
    right: 40,
  },

  /* Text */
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 23,
  },

  code: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginTop: 10,
    marginBottom: 16,
  },

  cta: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 30,
  },

  ctaText: {
    fontWeight: "700",
    fontSize: 13,
  },

  /* Pagination */
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    gap: 6,
  },

  dot: {
    height: 8,
    borderRadius: 4,
  },
});