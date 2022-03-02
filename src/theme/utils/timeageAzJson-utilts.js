export const timeageAz = (number ,index) => {
    return [
      ['az əvvəl', 'indi'],
      ['%s saniyə əvvəl', '%s saniyə içində'],
      ['1 dəqqə əvvəl', '1 dəqiqə içində'],
      ['%s dakika əvvəl', '%s əqiqə içində'],
      ['1 saat əvvəl', '1 saat içində'],
      ['%s saat əvvəl', '%s saat içində'],
      ['1 gün əvvəl', '1 gün içində'],
      ['%s gün əvvəl', '%s gün içində'],
      ['1 hafta əvvəl', '1 hafta içində'],
      ['%s hafta əvvəl', '%s hafta içində'],
      ['1 ay əvvəl', '1 ay içində'],
      ['%s ay əvvəl', '%s ay içində'],
      ['1 il əvvəl', '1 il içində'],
      ['%s il əvvəl', '%s il içində'],
    ][index];
  }