// To parse this JSON data, do
//
//     final doctorModel = doctorModelFromJson(jsonString);

import 'dart:convert';

DoctorModel doctorModelFromJson(String str) =>
    DoctorModel.fromJson(json.decode(str));

String doctorModelToJson(DoctorModel data) => json.encode(data.toJson());

class DoctorModel {
  DoctorModel({
    required this.id,
    required this.username,
    required this.password,
    required this.name,
    required this.phoneNumber,
    required this.email,
    required this.clinicAddress,
    required this.setOfPatients,
  });

  String id;
  String username;
  String password;
  String name;
  int phoneNumber;
  String email;
  String clinicAddress;
  List<String> setOfPatients;

  factory DoctorModel.fromJson(Map<String, dynamic> json) => DoctorModel(
        id: json["id"],
        username: json["username"],
        password: json["password"],
        name: json["name"],
        phoneNumber: json["phoneNumber"],
        email: json["email"],
        clinicAddress: json["clinicAddress"],
        setOfPatients: List<String>.from(json["setOfPatients"].map((x) => x)),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "username": username,
        "password": password,
        "name": name,
        "phoneNumber": phoneNumber,
        "email": email,
        "clinicAddress": clinicAddress,
        "setOfPatients": List<dynamic>.from(setOfPatients.map((x) => x)),
      };
}
