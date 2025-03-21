package com.example.hotelseekerbackend.utils;

public class DistanceCalculator {

    private static final int EARTH_RADIUS = 6371;

    public static double distance(double userLatitude, double userLongitude, double hotelLatitude, double hotelLongitude) {
        double dLat  = Math.toRadians((hotelLatitude - userLatitude));
        double dLong = Math.toRadians((hotelLongitude - userLongitude));

        userLatitude = Math.toRadians(userLatitude);
        hotelLatitude   = Math.toRadians(hotelLatitude);

        double a = haversin(dLat) + Math.cos(userLatitude) * Math.cos(hotelLatitude) * haversin(dLong);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    private static double haversin(double val) {
        return Math.pow(Math.sin(val / 2), 2);
    }
}
