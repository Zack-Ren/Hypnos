import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class Landing extends StatelessWidget {
  const Landing({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () => context.go('/login'),
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              stops: const [0.1, 0.9],
              colors: const [
                Color(0xFF676385),
                Color(0xFF262626),
              ],
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                SizedBox(
                  height: 350,
                ),
                Text(
                  'Sleep App',
                  style: TextStyle(fontSize: 24, color: Colors.white),
                ),
                Spacer(),
                TextButton(
                  onPressed: null,
                  child:
                      Text("About Us", style: TextStyle(color: Colors.white)),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
