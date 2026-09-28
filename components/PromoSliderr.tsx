import PromoSkeleton from "@/components/PromoSkeleton";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AUTO_SLIDE_INTERVAL = 4500;
const RESUME_DELAY = 1000;

// --- Image Assets ---
const ScooterImage = require("@/assets/icons/container.png");
const DiscountImage = require("@/assets/icons/gift2.png");
const ChefHatImage = require("@/assets/icons/gift.png");

// --- Image Size Map ---
const IMAGE_SIZES: Record<number, { width: number; height: number }> = {
  0: { width: 140, height: 140 },
  1: { width: 200, height: 200 },
  2: { width: 160, height: 160 },
};

// --- Dot Colors Map ---
const DOT_COLORS = ["#E63946", "#FF7A00", "#6C4EE3"];

// --- Shared Promo Card ---
function PromoCard({
  index,
  colors,
  badge,
  title,
  code,
  ctaText,
  ctaColor,
  imageSource,
}: any) {
  const imageSize = IMAGE_SIZES[index] || {
    width: 140,
    height: 140,
  };

  return (
    <LinearGradient colors={colors} style={styles.card}>
      <View style={[styles.ball, styles.ballTop]} />
      <View style={[styles.ball, styles.ballBottom]} />

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

      <View style={styles.illustrationContainer}>
        <Image
          source={imageSource}
          style={[styles.illustrationImage, imageSize]}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}

// --- Cards ---
function DeliveryCard({ index }: { index: number }) {
  return (
    <PromoCard
      index={index}
      colors={["#FF6B4A", "#E63946"]}
      badge="🔥 LIMITED TIME"
      title={`Free delivery\non first order!`}
      code="Use code: HEYBITE1"
      ctaText="Order now"
      ctaColor="#E63946"
      imageSource={ScooterImage}
    />
  );
}

function DiscountCard({ index }: { index: number }) {
  return (
    <PromoCard
      index={index}
      colors={["#FFB300", "#FF7A00"]}
      badge="💸 THIS WEEK"
      title={`30% off\norders above ₦5k!`}
      code="Use code: SAVE30"
      ctaText="Grab deal"
      ctaColor="#FF7A00"
      imageSource={DiscountImage}
    />
  );
}

function NewItemsCard({ index }: { index: number }) {
  return (
    <PromoCard
      index={index}
      colors={["#6C4EE3", "#9B5CFF"]}
      badge="✨ JUST ADDED"
      title={`New restaurants\nnow on HeyBite!`}
      code="Explore fresh menus"
      ctaText="Browse now"
      ctaColor="#6C4EE3"
      imageSource={ChefHatImage}
    />
  );
}

const SLIDES = [DeliveryCard, DiscountCard, NewItemsCard];

export default function PromoSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const currentIndex = useRef(0);
  const autoSlideTimer = useRef<number | null>(null);
  const resumeTimer = useRef<number | null>(null);

  // Measure the actual width of the component
  const handleLayout = (e: any) => {
    const measuredWidth = e.nativeEvent.layout.width;

    if (measuredWidth > 0 && measuredWidth !== slideWidth) {
      setSlideWidth(measuredWidth);
    }
  };

  // Track current slide
  const handleScroll = (event: any) => {
    if (!slideWidth) return;

    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / slideWidth);

    if (newIndex >= 0 && newIndex < SLIDES.length) {
      currentIndex.current = newIndex;
    }
  };

  // Go to specific slide
  const goTo = (index: number) => {
    currentIndex.current = index;

    scrollRef.current?.scrollTo({
      x: index * slideWidth,
      animated: true,
    });
  };

  // Pause auto-slide
  const handleTouchStart = () => {
    setIsPaused(true);

    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }
  };

  // Resume auto-slide
  const handleTouchEnd = () => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }

    resumeTimer.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  // Auto-slide
  useEffect(() => {
    if (!slideWidth || isPaused) {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }

      return;
    }

    autoSlideTimer.current = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % SLIDES.length;

      goTo(nextIndex);
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [isPaused, slideWidth]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    };
  }, []);

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {!slideWidth ? (
        <PromoSkeleton />
      ) : (
        <>
          <Animated.ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              {
                useNativeDriver: false,
                listener: handleScroll,
              },
            )}
            scrollEventThrottle={16}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onScrollBeginDrag={handleTouchStart}
            onScrollEndDrag={handleTouchEnd}
          >
            {SLIDES.map((Slide, index) => (
              <View key={index} style={{ width: slideWidth }}>
                <View style={styles.cardPadding}>
                  <Slide index={index} />
                </View>
              </View>
            ))}
          </Animated.ScrollView>

          {/* Pagination */}
          <View style={styles.dots}>
            {SLIDES.map((_, index) => {
              const dotWidth = scrollX.interpolate({
                inputRange: [
                  (index - 1) * slideWidth,
                  index * slideWidth,
                  (index + 1) * slideWidth,
                ],
                outputRange: [8, 20, 8],
                extrapolate: "clamp",
              });

              const dotColor = scrollX.interpolate({
                inputRange: [
                  (index - 1) * slideWidth,
                  index * slideWidth,
                  (index + 1) * slideWidth,
                ],
                outputRange: ["#3a3a3a", DOT_COLORS[index], "#3a3a3a"],
                extrapolate: "clamp",
              });

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => goTo(index)}
                  hitSlop={8}
                >
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        width: dotWidth,
                        backgroundColor: dotColor,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },

  cardPadding: {
    paddingHorizontal: 16,
  },

  card: {
    height: 220,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    zIndex: 2,
  },

  illustrationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: -10,
    zIndex: 2,
  },

  illustrationImage: {
    width: 140,
    height: 140,
  },

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

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 24,
  },

  code: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginTop: 8,
    marginBottom: 14,
  },

  cta: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },

  ctaText: {
    fontWeight: "700",
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },

  dot: {
    height: 8,
    borderRadius: 4,
  },
});
