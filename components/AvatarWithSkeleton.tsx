import { Fonts } from "@/constants/Fonts";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

const getInitials = (fullName: string) => {
  return fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const AvatarWithSkeleton = ({
  avatarUrl,
  fullName,
}: {
  avatarUrl?: string;
  fullName: string;
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(avatarUrl);
  const skeletonOpacity = useRef(new Animated.Value(0.3)).current;

  // reset loading state when url changes
  useEffect(() => {
    if (currentUrl !== avatarUrl) {
      setIsImageLoading(true);
      setHasImageError(false);
      setCurrentUrl(avatarUrl);
    }
  }, [avatarUrl, currentUrl]);

  useEffect(() => {
    if (isImageLoading && avatarUrl) {
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
  }, [isImageLoading, avatarUrl, skeletonOpacity]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setHasImageError(true);
  };

  if (!avatarUrl || hasImageError) {
    return (
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.avatarWrapper}>
      {isImageLoading && (
        <Animated.View
          style={[styles.avatarSkeleton, { opacity: skeletonOpacity }]}
        />
      )}
      <Image
        key={avatarUrl}
        source={{ uri: avatarUrl }}
        style={[styles.avatarImage, isImageLoading && { opacity: 0 }]}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    marginRight: 12,
    position: "relative",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#171717",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F7F7F5",
  },
  avatarSkeleton: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
  },
  avatarText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: "#E5E5E5",
  },
});
