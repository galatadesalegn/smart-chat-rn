import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function TypingIndicator() {
  const { theme } = useTheme();
  const dots = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useEffect(() => {
    const animations = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
        ])
      )
    );
    animations.forEach(a => a.start());
    return () => animations.forEach(a => a.stop());
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.aiBubble, borderColor: theme.border }]}>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { backgroundColor: theme.textSecondary, opacity: dot }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center',
    gap: 4, padding: 12, borderRadius: 16,
    alignSelf: 'flex-start', marginLeft: 40,
    borderWidth: 0.5, marginTop: 4,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
