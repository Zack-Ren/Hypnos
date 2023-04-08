/// Similar to [AccelerationData], but holds gyroscope data.

class GyroscopeData {
  final DateTime date;
  final List<num> val;

  GyroscopeData(this.val, this.date);

  DateTime get getDate => date;
  List<num> get getVal => val;
}
