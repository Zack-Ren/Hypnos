import 'package:flutter/material.dart';
import 'package:sleep_app/screens/help.dart';
import 'package:sleep_app/screens/profile.dart';
import 'package:sleep_app/screens/recording.dart';
import 'package:sleep_app/screens/stats.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int _currentScreen = 0;
  static const List<Widget> _screens = <Widget>[
    Recording(),
    Stats(),
    Help(),
    Profile(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _currentScreen = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens.elementAt(_currentScreen),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentScreen,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.emergency_recording),
            label: "Record",
            backgroundColor: Color(0xFF202020),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.bar_chart_rounded),
            label: "Stats",
            backgroundColor: Color(0xFF202020),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.help),
            label: "Help",
            backgroundColor: Color(0xFF202020),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: "Profile",
            backgroundColor: Color(0xFF202020),
          )
        ],
        selectedItemColor: Color(0xFF7F78AB),
        onTap: _onItemTapped,
      ),
    );
  }
}
