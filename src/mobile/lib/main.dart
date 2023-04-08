import 'dart:io';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:sleep_app/models/data.dart';
import 'package:sleep_app/screens/home.dart';
import 'package:sleep_app/screens/landing.dart';
import 'package:sleep_app/screens/login.dart';

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  HttpOverrides.global = new MyHttpOverrides();
  runApp(const MyApp());
}

final GoRouter _router = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) => const Landing(),
      routes: <RouteBase>[
        GoRoute(
          path: 'login',
          pageBuilder: (context, state) {
            return CustomTransitionPage(
              key: state.pageKey,
              child: Login(),
              transitionsBuilder:
                  (context, animation, secondaryAnimation, child) {
                return FadeTransition(
                  opacity: CurveTween(curve: Curves.easeInOutCirc)
                      .animate(animation),
                  child: child,
                );
              },
            );
          },
        ),
        GoRoute(
          path: 'home',
          pageBuilder: (context, state) {
            return CustomTransitionPage(
              key: state.pageKey,
              child: Home(),
              transitionsBuilder:
                  (context, animation, secondaryAnimation, child) {
                return FadeTransition(
                  opacity: CurveTween(curve: Curves.easeInOutCirc)
                      .animate(animation),
                  child: child,
                );
              },
            );
          },
        ),
      ],
    ),
  ],
);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => DataModel(),
      child: MaterialApp.router(
        title: 'Sleep App',
        theme: ThemeData(fontFamily: 'Montserrat'),
        routerConfig: _router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
