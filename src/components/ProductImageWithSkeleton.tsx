import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export const ProductImageWithSkeleton = ({
  imageUrl,
}: {
  imageUrl?: string;
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);
  const skeletonOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isImageLoading && imageUrl) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(skeletonOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(skeletonOpacity, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isImageLoading, imageUrl, skeletonOpacity]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setHasImageError(true);
  };

  if (!imageUrl || hasImageError) {
    return (
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage} />
      </View>
    );
  }

  return (
    <View style={styles.imageContainer}>
      {isImageLoading && (
        <Animated.View
          style={[styles.skeletonImage, { opacity: skeletonOpacity }]}
        />
      )}
      <Image
        source={{ uri: imageUrl }}
        style={styles.productImage}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  skeletonImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F7F7F5",
    borderRadius: 20,
  },
});
