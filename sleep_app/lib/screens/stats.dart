import 'package:flutter/material.dart';
import 'package:sleep_app/widgets/chart.dart';

class Stats extends StatelessWidget {
  const Stats({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xFF262626),
        body: SafeArea(
          child: SingleChildScrollView(
            child: Center(
              child: Column(
                children: const [
                  SizedBox(height: 25),
                  Text(
                    "Stats",
                    style: TextStyle(color: Colors.white, fontSize: 20),
                  ),
                  SizedBox(height: 25),
                  Chart(),
                ],
              ),
            ),
          ),
        ));
  }
}
