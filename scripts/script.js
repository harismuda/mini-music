new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Apa ini cinta",
          artist: "Caitlin Halderman",
          cover: "https://github.com/harismuda/foto-img/blob/main/img/i1.jpg?raw=true",
          source: "https://github.com/harismuda/foto-img/blob/main/mp3/Caitlin%20Halderman%20%E2%80%93%20Apa%20Ini%20Cinta%20(OST.%20Aku%20Dan%20Mesin%20Waktu).mp3?raw=true",
          url: "https://youtu.be/uvScDhoiEtw?si=Y9vkTgFTqYf152EH",
          favorited: false
        },
        {
          name: "Rumah Singgah",
          artist: "Fabio Asher",
          cover: "https://github.com/harismuda/foto-img/blob/main/img/i2.jpg?raw=true",
          source: "https://github.com/harismuda/foto-img/blob/main/mp3/FABIO%20ASHER%20-%20RUMAH%20SINGGAH%20(OFFICIAL%20MUSIC%20VIDEO).mp3?raw=true",
          url: "https://youtu.be/5k6IkftDRwE?si=iWhJRgU4b41nAyhl",
          favorited: false
        },
        {
          name: "Duka",
          artist: "Last Child",
          cover: "https://github.com/harismuda/foto-img/blob/main/img/i3.jpg?raw=true",
          source: "https://github.com/harismuda/foto-img/blob/main/mp3/Last%20Child%20-%20DUKA%20(Official%20Lyric%20Video).mp3?raw=true",
          url: "https://youtu.be/8zwz2fVgfVM?si=Alg0kBwwlwQZt-yn",
          favorited: true
        },
        {
          name: "Pilihan Hatiku",
          artist: "Lavina",
          cover: "https://github.com/harismuda/foto-img/blob/main/img/i4.jpg?raw=true",
          source: "https://github.com/harismuda/foto-img/blob/main/mp3/PILIHAN%20HATIKU%20-%20LAVINA%20(LYRICS).mp3?raw=true",
          url: "https://youtu.be/15ZzB0jxgeo?si=TUgci1_GQxZEsO-9",
          favorited: true
        },
        {
          name: "Bukti",
          artist: "Virgoun",
          cover: "https://github.com/harismuda/foto-img/blob/main/img/i5.jpg?raw=true",
          source: "https://github.com/harismuda/foto-img/blob/main/mp3/Virgoun%20-%20Bukti%20(Official%20Lyric%20Video).mp3?raw=true",
          url: "https://youtu.be/s9NoBV_7yVI?si=3AcGXwwiZXzxPLYR",
          favorited: false
        },
        {
          name: "Surat Cinta Untuk Starla",
          artist: "Virgoun",
          cover: "https://github.com/harismuda/foto-img/blob/main/img/i6.jpg?raw=true",
          source: "https://github.com/harismuda/foto-img/blob/main/mp3/Virgoun%20-%20Surat%20Cinta%20Untuk%20Starla%20(Official%20Lyric%20Video).mp3?raw=true",
          url: "https://youtu.be/FocFked1TbQ?si=ERvigG0AjoD-5P90",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
