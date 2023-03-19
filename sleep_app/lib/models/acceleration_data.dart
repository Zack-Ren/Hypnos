class AccelerationData {
  final DateTime date;
  final List<num> val;

  AccelerationData(this.val, this.date);

  DateTime get getDate => date;
  List<num> get getVal => val;
}
