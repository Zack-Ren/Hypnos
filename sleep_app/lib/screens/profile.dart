import 'package:flutter/material.dart';
import 'package:sleep_app/models/data.dart';
import 'package:sleep_app/models/doctor_model.dart';
import 'package:sleep_app/models/patient_model.dart';
import 'package:sleep_app/services/api_service.dart';

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  late Future<PatientModel> patient;
  late Future<DoctorModel> doctor;

  @override
  void initState() {
    super.initState();
    patient = ApiService.getPatient(DataModel.getId());
    doctor = ApiService.getDoctor(DataModel.getDocId());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF262626),
      body: Center(
        child: Column(
          children: [
            SizedBox(height: 100),
            Text(
              "Profile",
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
            SizedBox(height: 25),
            FutureBuilder(
              future: Future.wait([patient, doctor]),
              builder: (context, AsyncSnapshot<List<dynamic>> snapshot) {
                if (snapshot.hasData) {
                  return Column(
                    children: [
                      Card(
                        color: Color(0xFF333333),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(20)),
                        ),
                        child: SizedBox(
                          width: 335,
                          child: Padding(
                            padding: EdgeInsets.all(15),
                            child: Text(
                                "Name: ${snapshot.data![0].name}\n\nPhone Number: ${snapshot.data![0].phoneNumber}\n\nEmail: ${snapshot.data![0].email}",
                                style: TextStyle(
                                    color: Colors.white, fontSize: 16)),
                          ),
                        ),
                      ),
                      SizedBox(height: 25),
                      Card(
                        color: Color(0xFF333333),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(Radius.circular(20)),
                        ),
                        child: SizedBox(
                          width: 335,
                          child: Padding(
                            padding: EdgeInsets.all(15),
                            child: RichText(
                              text: TextSpan(
                                text: "Physician Info",
                                style: TextStyle(
                                  color: Colors.white,
                                  decoration: TextDecoration.underline,
                                  fontFamily: "Montserrat",
                                  fontSize: 16,
                                ),
                                children: <TextSpan>[
                                  TextSpan(
                                    text:
                                        '\n\nName: ${snapshot.data![1].name}\n\nClinic Address: ${snapshot.data![1].clinicAddress}\n\nContact Info: ${snapshot.data![1].phoneNumber} \n${snapshot.data![1].email}',
                                    style: TextStyle(
                                        decoration: TextDecoration.none),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  );
                } else if (snapshot.hasError) {
                  return Text('${snapshot.error}');
                }
                return const CircularProgressIndicator();
              },
            ),
          ],
        ),
      ),
    );
  }
}
