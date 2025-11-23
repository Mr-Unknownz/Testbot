const config = require("../settings");
const {
  cmd,
  commands
} = require("../lib/command");
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
  jsonformat
} = require("../lib/functions");
const axios = require("axios");
const cheerio = require("cheerio");
const {
  sizeFormatter
} = require("human-readable");
const _0x2d237a = {
  pattern: "movie",
  category: "movie",
  react: '🎬',
  desc: "cinesubz & ytsmx & sinhalasub & Firemoviehub movie downloader",
  use: ".movie movie name",
  filename: __filename
};
cmd(_0x2d237a, async (_0x575f94, _0x1c6df6, _0x5675b5, {
  reply: _0xcb416c,
  isDev: _0x511af5,
  from: _0x231e60,
  l: _0x452dfd,
  q: _0x499798,
  prefix: _0x16d077
}) => {
  try {
    if (!_0x499798) {
      return await _0xcb416c("*Please Give Me Text..! 🖊️*");
    }
    if (config.MODE === "nonbutton") {
      const _0x3ebdd9 = [{
        'title': "*🎬 SELECT MOVIE SITES 🎬*",
        'rows': [{
          'title': "    1",
          'rowId': _0x16d077 + "cinesubz " + _0x499798,
          'description': "Download in Cinesubz"
        }, {
          'title': "    2",
          'rowId': _0x16d077 + "sinhalasub " + _0x499798,
          'description': "Download in Sinhalsub"
        }, {
          'title': "    3",
          'rowId': _0x16d077 + "ytsmx " + _0x499798,
          'description': "Download in Ytsmx"
        }, {
          'title': "    4",
          'rowId': _0x16d077 + "pirate " + _0x499798,
          'description': "Download in Pirate"
        }, {
          'title': "    5",
          'rowId': _0x16d077 + "slanimeclub " + _0x499798,
          'description': "Download in Slanimeclub"
        }, {
          'title': "    6",
          'rowId': _0x16d077 + "ginisisila " + _0x499798,
          'description': "Download in Ginisisila"
        }, {
          'title': "    7",
          'rowId': _0x16d077 + "firemovie " + _0x499798,
          'description': "Download in Firemoviehub"
        }]
      }, {
        'title': "*🎬 SELECT SUBSTITLE SITES 🎬*",
        'rows': [{
          'title': "    8",
          'rowId': _0x16d077 + "zoom " + _0x499798,
          'description': "Download in Zoom"
        }, {
          'title': "    9",
          'rowId': _0x16d077 + "subz " + _0x499798,
          'description': "Download in Subz"
        }, {
          'title': "    10",
          'rowId': _0x16d077 + "s-subtitle " + _0x499798,
          'description': "Download in S-subtitle"
        }]
      }];
      const _0xe06e55 = {
        url: config.LOGO
      };
      const _0x374aba = {
        caption: "🎬 VAJIRA MD MOVIE-DL 🎬\n\nAvailble movies sites....\n\n- Cinesubz ➱ https://cinesubz.co/\n- Sinhalasubs ➱ https://sinhalasub.lk/\n- Ytsmx ➱ https://yts.mx/\n- Pirate ➱ https://pirate.lk/\n- Ginisisila ➱ https://ginisisilacartoon.net/\n- Slanimeclub ➱ https://slanimeclub.co/\n- Firemovie ➱ https://firemovieshub.com/\n\n\nAvailable Subtitle sites....\n\n- Sinhalasubstitle ➱ https://sinhala-subtitles.com/\n- Zoom ➱ https://zoom.lk/\n- Subz ➱ https://subz.lk/",
        image: _0xe06e55,
        footer: "MOVIE DOWNLOADER BY VAJIRA MD",
        title: "Result from Cinezubs & Ytsmx & Firemoviehub and sinhalasub. 📲",
        buttonText: "*🔢 Reply below number*",
        sections: _0x3ebdd9
      };
      const _0x43e0b3 = {
        quoted: _0x1c6df6
      };
      return await _0x575f94.replyList(_0x231e60, _0x374aba, _0x43e0b3);
    }
    if (config.MODE === "button") {
      const _0x20ad83 = {
        title: "*🎬 SELECT MOVIE SITES 🎬*",
        rows: [{
          'header': '',
          'title': '',
          'description': "Download in Cinesubz",
          'id': _0x16d077 + "cinesubz " + _0x499798
        }, {
          'header': '',
          'title': '',
          'description': "Download in Sinhalasub",
          'id': _0x16d077 + "sinhalasub " + _0x499798
        }, {
          'header': '',
          'title': '',
          'description': "Download in Ytsmx",
          'id': _0x16d077 + "ytsmx " + _0x499798
        }, {
          'header': '',
          'title': '',
          'description': "Download in Pirate",
          'id': _0x16d077 + "pirate " + _0x499798
        }, {
          'header': '',
          'title': '',
          'description': "Download in Slanimeclub",
          'id': _0x16d077 + "slanimeclub " + _0x499798
        }, {
          'header': '',
          'title': '',
          'description': "Download in Ginisisila",
          'id': _0x16d077 + "ginisisila " + _0x499798
        }, {
          'header': '',
          'title': '',
          'description': "Download in Firemovie",
          'id': _0x16d077 + "firemovie " + _0x499798
        }]
      };
      const _0x264603 = {
        title: "*🎬 SELECT SUBSTITLE SITES 🎬*",
        rows: [{
          'header': '',
          'title': '',
          'description': "Download in Zoom",
          'id': _0x16d077 + "zoom " + _0x499798
        }, {
          'header': '',
          'title': '',
          'description': "Download in Subz",
          'id': _0x16d077 + "subz " + _0x499798
        }, {
          'header': '',
          'title': '',
          'description': "Download in S-Subtitle",
          'id': _0x16d077 + "s-subtitle " + _0x499798
        }]
      };
      let _0x50590a = [_0x20ad83, _0x264603];
      const _0x43dc6a = {
        title: "Click Here⎙",
        sections: _0x50590a
      };
      const _0x562b0a = {
        url: config.LOGO
      };
      const _0x41a9c1 = {
        displayText: "PING"
      };
      const _0x2e604f = {
        buttonId: _0x16d077 + "ping " + _0x499798,
        buttonText: _0x41a9c1
      };
      const _0x5e95e8 = {
        quoted: _0x5675b5
      };
      _0x575f94.sendMessage(_0x231e60, {
        'image': _0x562b0a,
        'caption': "🎬 VAJIRA MD MOVIE-DL 🎬\n\nAvailble movies sites....\n\n- Cinesubz ➱ https://cinesubz.co/\n- Sinhalasubs ➱ https://sinhalasub.lk/\n- Ytsmx ➱ https://yts.mx/\n- Pirate ➱ https://pirate.lk/\n- Ginisisila ➱ https://ginisisilacartoon.net/\n- Slanimeclub ➱ https://slanimeclub.co/\n- Firemovie ➱ https://firemovieshub.com/\n\n\nAvailable Subtitle sites....\n\n- Sinhalasubstitle ➱ https://sinhala-subtitles.com/\n- Zoom ➱ https://zoom.lk/\n- Subz ➱ https://subz.lk/",
        'footer': config.FOOTER,
        'buttons': [_0x2e604f, {
          'buttonId': "action",
          'buttonText': {
            'displayText': "ini pesan interactiveMeta"
          },
          'type': 0x4,
          'nativeFlowInfo': {
            'name': "single_select",
            'paramsJson': JSON.stringify(_0x43dc6a)
          }
        }],
        'headerType': 0x1,
        'viewOnce': true
      }, _0x5e95e8);
    }
  } catch (_0x124731) {
    _0xcb416c("*ERROR !!*");
    _0x452dfd(_0x124731);
  }
});
function _0xb8b3(_0x102047, _0x5a0332) {
  const _0x3a72e1 = _0x1321();
  _0xb8b3 = function (_0x132136, _0xb8b39e) {
    _0x132136 = _0x132136 - 149;
    let _0x57aaac = _0x3a72e1[_0x132136];
    return _0x57aaac;
  };
  return _0xb8b3(_0x102047, _0x5a0332);
}
const _0xf18a1 = {
  pattern: "ginisisila",
  react: '📑',
  category: "movie",
  desc: "ginisisila cartoon downloader",
  filename: __filename
};
cmd(_0xf18a1, async (_0xf000cf, _0x58fb25, _0x2615c6, {
  from: _0x37b659,
  prefix: _0x5b47ed,
  q: _0x956733,
  l: _0x57b3b7,
  isDev: _0x3ee820,
  reply: _0x4039ce
}) => {
  try {
    if (!_0x956733) {
      return await _0x4039ce("*Please Give Me Text..! 🖊️*");
    }
    const _0x374782 = "https://ginisisilacartoon.net/search.php?q=" + _0x956733;
    const _0x13a1bc = await axios.get(_0x374782);
    const _0x15b167 = cheerio.load(_0x13a1bc.data);
    let _0x22f260 = [];
    _0x15b167("#page_panels_ > table > tbody > tr > td > div").each((_0x4ea257, _0x4929eb) => {
      _0x22f260.push({
        'title': _0x15b167(_0x4929eb).find("div.video-title").text(),
        'date': _0x15b167(_0x4929eb).find("div.posted-time").text(),
        'image': _0x15b167(_0x4929eb).find("a > img").attr("src"),
        'link': _0x15b167(_0x4929eb).find('a').attr("href")
      });
    });
    const _0x2644da = {
      quoted: _0x2615c6
    };
    if (_0x22f260.length < 1) {
      return await _0xf000cf.sendMessage(_0x37b659, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x2644da);
    }
    var _0x15e68b = [];
    for (var _0x242624 = 0; _0x242624 < _0x22f260.length; _0x242624++) {
      _0x15e68b.push({
        'title': _0x242624 + 1,
        'description': _0x22f260[_0x242624].title + '+' + _0x22f260[_0x242624].date,
        'rowId': _0x5b47ed + "ginidl " + _0x22f260[_0x242624].link
      });
    }
    const _0x563e22 = {
      title: "_[Result from ginisisila.]_",
      rows: _0x15e68b
    };
    const _0x228f0d = [_0x563e22];
    const _0x3cba46 = {
      url: "https://i.ibb.co/0s0WcmF/1og6o9e2.png"
    };
    const _0x74cac9 = {
      caption: "🎬 VAJIRA MD MOVIE-DL 🎬\n\n   ⏳ Search A Movie Name: " + _0x956733 + "\n📲 Search top 10 Movies\n",
      image: _0x3cba46,
      footer: "MOVIE DOWNLOADER BY TC",
      title: "Search By firemovieshub",
      buttonText: "*🔢 Reply below number*",
      sections: _0x228f0d
    };
    const _0x4b5db0 = {
      quoted: _0x2615c6
    };
    return await _0xf000cf.replyList(_0x37b659, _0x74cac9, _0x4b5db0);
  } catch (_0x7ddc78) {
    _0x4039ce("*ERROR !!*");
    _0x57b3b7(_0x7ddc78);
  }
});
const _0xd50a51 = {
  pattern: "ginidl",
  filename: __filename
};
cmd(_0xd50a51, async (_0x31019d, _0x2508f9, _0x3113a7, {
  from: _0x30c057,
  prefix: _0x3139fc,
  q: _0x157d68,
  l: _0x2afb4f,
  isDev: _0x2da402,
  reply: _0x5b3468
}) => {
  try {
    if (!_0x157d68) {
      return await _0x5b3468("*Please Give Me Text..! 🖊️*");
    }
    const _0x70bb91 = "https://ginisisilacartoon.net/" + _0x157d68;
    const _0x3426a6 = await axios.get(_0x70bb91);
    const _0x3b3c97 = cheerio.load(_0x3426a6.data);
    const _0x9fbef2 = _0x3b3c97("#player-holder > div > iframe").attr("src");
    const _0x5830d4 = _0x3b3c97("#watch-contentHd").text();
    const _0x535b90 = "📃 *Title:* " + _0x5830d4;
    const _0x215d58 = [{
      'title': "*🎬 MOVIE-SEARCH-SITE 🎬*",
      'rows': [{
        'title': "    1.1",
        'rowId': _0x3139fc + ("gdrive " + _0x9fbef2),
        'description': "Download in " + _0x5830d4
      }]
    }];
    const _0x1cc6cc = {
      text: _0x535b90,
      footer: "MOVIE DOWNLOADER BY VAJIRA MD",
      title: "Search By ginisisila",
      buttonText: "*🔢 Reply below number*",
      sections: _0x215d58
    };
    const _0x47c9d2 = {
      quoted: _0x3113a7
    };
    return await _0x31019d.replyList(_0x30c057, _0x1cc6cc, _0x47c9d2);
  } catch (_0xbfb898) {
    _0x5b3468("*ERROR !!*");
    _0x2afb4f(_0xbfb898);
  }
});
async function GDriveDl(_0x23f8fb) {
  const _0x1b3e8c = {
    error: true
  };
  let _0x38736d;
  let _0x556bb1 = _0x1b3e8c;
  if (!(_0x23f8fb && _0x23f8fb.match(/drive\.google/i))) {
    return _0x556bb1;
  }
  const _0x64aa10 = sizeFormatter({
    'std': "JEDEC",
    'decimalPlaces': 0x2,
    'keepTrailingZeroes': false,
    'render': (_0x4058cc, _0x1a927d) => _0x4058cc + " " + _0x1a927d + 'B'
  });
  try {
    _0x38736d = (_0x23f8fb.match(/\/?id=(.+)/i) || _0x23f8fb.match(/\/d\/(.*?)\//))[1];
    if (!_0x38736d) {
      throw "ID Not Found";
    }
    _0x556bb1 = await fetch("https://drive.google.com/uc?id=" + _0x38736d + "&authuser=0&export=download", {
      'method': "post",
      'headers': {
        'accept-encoding': "gzip, deflate, br",
        'content-length': 0x0,
        'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
        'origin': "https://drive.google.com",
        'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        'x-client-data': "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
        'x-drive-first-party': "DriveWebUi",
        'x-json-requested': "true"
      }
    });
    let {
      fileName: _0xa35509,
      sizeBytes: _0x566c88,
      downloadUrl: _0x180c67
    } = JSON.parse((await _0x556bb1.text()).slice(4));
    if (!_0x180c67) {
      throw "Link Download Limit!";
    }
    let _0x414dcf = await fetch(_0x180c67);
    if (_0x414dcf.status !== 200) {
      return _0x414dcf.statusText;
    }
    return {
      'downloadUrl': _0x180c67,
      'fileName': _0xa35509,
      'fileSize': _0x64aa10(_0x566c88),
      'mimetype': _0x414dcf.headers.get("content-type")
    };
  } catch (_0x4fe9af) {
    console.log(_0x4fe9af);
    return _0x556bb1;
  }
}
const _0x8539f5 = {
  pattern: "pirate",
  react: '📑',
  category: "movie"
};
function _0x36377a(_0x32b734, _0x331780, _0x3a66f2, _0x34dc43, _0x1f52b5) {
  return _0xb8b3(_0x34dc43 - 0x2f3, _0x32b734);
}
_0x8539f5.desc = "pirate moive downloader";
_0x8539f5.filename = __filename;
cmd(_0x8539f5, async (_0x205ecc, _0x1af1e2, _0x125e28, {
  from: _0x1d6f23,
  prefix: _0x562f2d,
  q: _0x13c116,
  l: _0x8ce60d,
  isDev: _0x5c8d73,
  reply: _0x5aa3b4
}) => {
  try {
    if (!_0x13c116) {
      return await _0x5aa3b4("*Please Give Me Text..! 🖊️*");
    }
    const _0x597bc8 = await fetchJson(config.API + "/api/pirate/search?q=" + _0x13c116 + "&apikey=" + config.APIKEY);
    const _0x3af59a = {
      quoted: _0x125e28
    };
    if (_0x597bc8.data.data.data.length < 1) {
      return await _0x205ecc.sendMessage(_0x1d6f23, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x3af59a);
    }
    var _0x4a5425 = [];
    for (var _0x138764 = 0; _0x138764 < _0x597bc8.data.data.data.length; _0x138764++) {
      _0x4a5425.push({
        'title': _0x138764 + 1,
        'description': _0x597bc8.data.data.data[_0x138764].title + " | " + _0x597bc8.data.data.data[_0x138764].rating,
        'rowId': _0x562f2d + "piratein " + _0x597bc8.data.data.data[_0x138764].link
      });
    }
    const _0x370192 = {
      title: "_[Result from pirate.]_",
      rows: _0x4a5425
    };
    const _0x4a95d3 = [_0x370192];
    const _0x19bea4 = {
      text: '',
      footer: config.FOOTER,
      title: "Result from pirate. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x4a95d3
    };
    const _0x50f067 = {
      quoted: _0x125e28
    };
    return await _0x205ecc.replyList(_0x1d6f23, _0x19bea4, _0x50f067);
  } catch (_0x1e59aa) {
    _0x5aa3b4("*ERROR !!*");
    _0x8ce60d(_0x1e59aa);
  }
});
const _0x687723 = {
  pattern: "piratein",
  react: '📑',
  filename: __filename
};
cmd(_0x687723, async (_0x2ce44e, _0x37c13c, _0x3b8c28, {
  from: _0xe545ff,
  prefix: _0x3adbb3,
  q: _0x5f1992,
  l: _0x1ee337,
  isDev: _0x460dd5,
  reply: _0x4b3120
}) => {
  try {
    if (!_0x5f1992) {
      return await _0x4b3120("*Please Give Me Text..! 🖊️*");
    }
    const _0x5b81b5 = await fetchJson(config.API + "/api/pirate/movie?url=" + _0x5f1992 + "&apikey=" + config.APIKEY);
    const _0x5278d5 = {
      quoted: _0x3b8c28
    };
    if (_0x5b81b5.data.data.dllinks.directDownloadLinks.length < 1) {
      return await _0x2ce44e.sendMessage(_0xe545ff, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x5278d5);
    }
    var _0x40e6e2 = [];
    for (var _0x46454d = 0; _0x46454d < _0x5b81b5.data.data.dllinks.directDownloadLinks.length; _0x46454d++) {
      _0x40e6e2.push({
        'title': _0x46454d + 1,
        'description': _0x5b81b5.data.data.dllinks.directDownloadLinks[_0x46454d].quality + " | " + _0x5b81b5.data.data.dllinks.directDownloadLinks[_0x46454d].size + " | " + _0x5b81b5.data.data.dllinks.directDownloadLinks[_0x46454d].platform,
        'rowId': _0x3adbb3 + ("piratedl " + _0x5b81b5.data.data.dllinks.directDownloadLinks[_0x46454d].link + '|' + _0x5b81b5.data.data.mainDetails.maintitle + '|' + _0x5b81b5.data.data.moviedata.imageUrls[0])
      });
    }
    const _0x58302c = {
      title: "_Select Movie_",
      rows: _0x40e6e2
    };
    const _0xd81082 = [_0x58302c, {
      'title': "*🎬 MOVIE INFO 🎬*",
      'rows': [{
        'title': "    1.1",
        'rowId': _0x3adbb3 + ("pirates " + _0x5f1992),
        'description': "Send Movie Details 📄"
      }]
    }, {
      'title': "*🎬 MOVIE IMAGES 🎬*",
      'rows': [{
        'title': "    1.2",
        'rowId': _0x3adbb3 + ("piratei " + _0x5f1992),
        'description': "Send Movie IMAGES 🏞️"
      }]
    }];
    const _0x33cba0 = {
      caption: "*_☘ Title: " + _0x5b81b5.data.data.mainDetails.maintitle + "_*\n\n- *Year:* " + _0x5b81b5.data.data.mainDetails.dateCreated + "\n- *Rating:* " + _0x5b81b5.data.data.mainDetails.runtime + "\n- *ImdbRating* " + _0x5b81b5.data.data.moviedata.imdbRating + "\n- *ImdbvotesCount* " + _0x5b81b5.data.data.moviedata.imdbvotesCount + "\n\n*⛏️ Link:* " + _0x5f1992,
      image: {},
      footer: "MOVIE DOWNLOADER BY TDD",
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: _0xd81082
    };
    _0x33cba0.image.url = _0x5b81b5.data.data.mainDetails.imageUrl;
    const _0x3e3bd0 = {
      quoted: _0x3b8c28
    };
    return await _0x2ce44e.replyList(_0xe545ff, _0x33cba0, _0x3e3bd0);
  } catch (_0x17e9b4) {
    _0x4b3120("*ERROR !!*");
    _0x1ee337(_0x17e9b4);
  }
});
const _0x49955f = {
  pattern: "pirates",
  react: '⬆',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x49955f, async (_0x48b8ca, _0x90f82e, _0x3c59ef, {
  reply: _0x24366b,
  isDev: _0x487dcc,
  from: _0x5f1b59,
  q: _0x3d5aad,
  prefix: _0x24715b
}) => {
  try {
    if (!_0x3d5aad) {
      return await _0x24366b("*Please Give Me Link..! 🖊️*");
    }
    const _0x3b9cdb = await fetchJson(config.API + "/api/pirate/movie?url=" + _0x3d5aad + "&apikey=" + config.APIKEY);
    const _0x41982b = "*_☘ Title: " + _0x3b9cdb.data.data.mainDetails.maintitle + "_*\n\n- *Year:* " + _0x3b9cdb.data.data.mainDetails.dateCreated + "\n- *Rating:* " + _0x3b9cdb.data.data.mainDetails.runtime + "\n- *ImdbRating* " + _0x3b9cdb.data.data.moviedata.imdbRating + "\n- *ImdbvotesCount* " + _0x3b9cdb.data.data.moviedata.imdbvotesCount + "\n\n*⛏️ Link:* " + _0x3d5aad + "\n\n" + config.FOOTER;
    const _0x113c57 = {
      url: _0x3b9cdb.data.data.moviedata.imageUrls[0]
    };
    const _0x494707 = {
      image: _0x113c57,
      caption: _0x41982b
    };
    const _0x51e115 = {
      quoted: _0x90f82e
    };
    return await _0x48b8ca.sendMessage(_0x5f1b59, _0x494707, _0x51e115);
  } catch (_0x443c1c) {
    _0x24366b("*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1");
    console.log(_0x443c1c);
  }
});
const _0x354545 = {
  pattern: "piratei",
  react: '⬆',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x354545, async (_0x21b175, _0x3c535f, _0x6b28dd, {
  reply: _0x279901,
  isDev: _0x122e8e,
  from: _0x45210e,
  q: _0x5416d7,
  prefix: _0x4f8d52
}) => {
  try {
    if (!_0x5416d7) {
      return await _0x279901("*Please Give Me Link..! 🖊️*");
    }
    const _0x333c04 = await fetchJson(config.API + "/api/pirate/movie?url=" + _0x5416d7 + "&apikey=" + config.APIKEY);
    const _0x28646e = config.FOOTER;
    _0x279901("UPLOADING MOVIE IMAGES 🔄");
    const _0x1c0282 = {
      url: _0x333c04.data.data.moviedata.imageUrls[0]
    };
    const _0x453f33 = {
      image: _0x1c0282,
      caption: _0x28646e
    };
    const _0x11bc72 = {
      quoted: _0x3c535f
    };
    await _0x21b175.sendMessage(_0x45210e, _0x453f33, _0x11bc72);
    const _0x1120e0 = {
      url: _0x333c04.data.data.moviedata.imageUrls[1]
    };
    const _0x50bbdb = {
      image: _0x1120e0,
      caption: _0x28646e
    };
    const _0xed40c0 = {
      quoted: _0x3c535f
    };
    await _0x21b175.sendMessage(_0x45210e, _0x50bbdb, _0xed40c0);
    const _0x19ea7e = {
      url: _0x333c04.data.data.moviedata.imageUrls[2]
    };
    const _0x7524d5 = {
      image: _0x19ea7e,
      caption: _0x28646e
    };
    const _0x454a44 = {
      quoted: _0x3c535f
    };
    await _0x21b175.sendMessage(_0x45210e, _0x7524d5, _0x454a44);
    const _0x51cf7d = {
      url: _0x333c04.data.data.moviedata.imageUrls[4]
    };
    const _0x1029bf = {
      image: _0x51cf7d,
      caption: _0x28646e
    };
    const _0x967812 = {
      quoted: _0x3c535f
    };
    await _0x21b175.sendMessage(_0x45210e, _0x1029bf, _0x967812);
    const _0x161a39 = {
      url: _0x333c04.data.data.moviedata.imageUrls[5]
    };
    const _0x382622 = {
      image: _0x161a39,
      caption: _0x28646e
    };
    const _0x40805f = {
      quoted: _0x3c535f
    };
    await _0x21b175.sendMessage(_0x45210e, _0x382622, _0x40805f);
    const _0x56ced9 = {
      text: '✅',
      key: _0x3c535f.key
    };
    const _0x308c9e = {
      react: _0x56ced9
    };
    await _0x21b175.sendMessage(_0x45210e, _0x308c9e);
  } catch (_0x5e65e2) {
    _0x279901("*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1");
    console.log(_0x5e65e2);
  }
});
const _0x45cf7b = {
  pattern: "piratedl",
  react: '📥',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x45cf7b, async (_0x4a8ac4, _0x163072, _0x49ace3, {
  from: _0x2d3033,
  q: _0x478760,
  isDev: _0x55653f,
  reply: _0x325043
}) => {
  if (!_0x478760) {
    return await _0x325043("*Please provide a direct URL!*");
  }
  try {
    const _0x45d8e8 = _0x478760.split('|')[0];
    const _0x447bce = _0x478760.split('|')[1] || "tdd_movie_dl_system";
    const _0x4d0801 = await fetchJson(config.API + "/api/pirate/download?url=" + _0x45d8e8 + "&apikey=" + config.APIKEY);
    const _0x1f7c2a = '' + _0x4d0801.data.data.link;
    const _0x716408 = _0x1f7c2a.replace('u', "api/file");
    console.log(_0x1f7c2a);
    console.log(_0x716408);
    _0x325043("╭═════════════════❀\n│  UPLOADING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀");
    if (_0x1f7c2a.includes("https://pixeldrain.com")) {
      const _0x941874 = {
        'document': await getBuffer(_0x716408),
        'caption': _0x447bce + "\n" + config.FOOTER,
        'mimetype': "video/mp4",
        'fileName': _0x447bce + ".mp4"
      };
      await _0x4a8ac4.sendMessage(_0x2d3033, _0x941874);
    }
    if (_0x1f7c2a.includes("https://www.amdahost.com")) {
      const _0x90580c = {
        'document': await getBuffer(_0x1f7c2a),
        'caption': _0x447bce + "\n" + config.FOOTER,
        'mimetype': "video/mp4",
        'fileName': _0x447bce + ".mp4"
      };
      await _0x4a8ac4.sendMessage(_0x2d3033, _0x90580c);
    }
    const _0x15352e = {
      text: '✅',
      key: _0x163072.key
    };
    const _0x458982 = {
      react: _0x15352e
    };
    await _0x4a8ac4.sendMessage(_0x2d3033, _0x458982);
  } catch (_0x29a531) {
    console.error("Error fetching or sending", _0x29a531);
    const _0x583dab = {
      quoted: _0x163072
    };
    await _0x4a8ac4.sendMessage(_0x2d3033, "*Error fetching or sending *", _0x583dab);
  }
});
const _0x8faacc = {
  pattern: "slanimeclub",
  react: '📑',
  category: "movie",
  desc: "slanimeclub movie downloader"
};
function _0x401b13(_0xf32d96, _0x19e2c1, _0x35ef39, _0x3fc63d, _0xb4c2a8) {
  return _0xb8b3(_0x19e2c1 - 0x3bd, _0xf32d96);
}
_0x8faacc.filename = __filename;
cmd(_0x8faacc, async (_0x581127, _0x479b87, _0x2712ba, {
  from: _0x3e423a,
  prefix: _0x14d1c1,
  q: _0x25acd1,
  l: _0x4dc506,
  isDev: _0x3aec5c,
  reply: _0x18e675
}) => {
  try {
    if (!_0x25acd1) {
      return await _0x18e675("*Please Give Me Text..! 🖊️*");
    }
    const _0x51d69e = await fetchJson(config.API + "/api/slanimeclub/search?q=" + _0x25acd1 + "&apikey=" + config.APIKEY);
    const _0x28113b = {
      quoted: _0x2712ba
    };
    if (_0x51d69e.data.data.data.length < 1) {
      return await _0x581127.sendMessage(_0x3e423a, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x28113b);
    }
    var _0x7aea21 = [];
    for (var _0x28b3d7 = 0; _0x28b3d7 < _0x51d69e.data.data.data.length; _0x28b3d7++) {
      _0x7aea21.push({
        'title': _0x28b3d7 + 1,
        'description': _0x51d69e.data.data.data[_0x28b3d7].title,
        'rowId': _0x14d1c1 + "slanime " + _0x51d69e.data.data.data[_0x28b3d7].link
      });
    }
    const _0x26869c = {
      title: "_[Result from slanimeclub.]_",
      rows: _0x7aea21
    };
    const _0x10cb1e = [_0x26869c];
    const _0x3738c6 = {
      text: '',
      footer: config.FOOTER,
      title: "Result from slanimeclub. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x10cb1e
    };
    const _0x336b37 = {
      quoted: _0x2712ba
    };
    return await _0x581127.replyList(_0x3e423a, _0x3738c6, _0x336b37);
  } catch (_0x33a71e) {
    _0x18e675("*ERROR !!*");
    _0x4dc506(_0x33a71e);
  }
});
const _0x3fa51d = {
  pattern: "slanime",
  react: '📑',
  category: "movie",
  desc: "slanimeclub moive downloader",
  filename: __filename
};
cmd(_0x3fa51d, async (_0x1116ab, _0x4ed752, _0x3422b8, {
  from: _0x39fa6a,
  prefix: _0x3b2d3c,
  q: _0xc4f954,
  l: _0x2f2a39,
  isDev: _0xf1a527,
  reply: _0x8d144
}) => {
  try {
    if (!_0xc4f954) {
      return await _0x8d144("*Please Give Me Text..! 🖊️*");
    }
    const _0x485063 = await fetchJson(config.API + "/api/slanimeclub/movie?url=" + _0xc4f954 + "&apikey=" + config.APIKEY);
    const _0x435195 = "*_☘ Title: " + _0x485063.data.data.moviedata.title + "_*\n\n- *Date:* " + _0x485063.data.data.moviedata.date + "\n- *Generous* " + _0x485063.data.data.moviedata.generous + "\n\n*⛏️ Link:* " + _0xc4f954;
    const _0x2251ad = {
      quoted: _0x3422b8
    };
    if (_0x485063.data.data.moviedata.seasons.length < 1) {
      return await _0x1116ab.sendMessage(_0x39fa6a, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x2251ad);
    }
    var _0x34eb73 = [];
    for (var _0x2a5457 = 0; _0x2a5457 < _0x485063.data.data.moviedata.seasons.length; _0x2a5457++) {
      _0x34eb73.push({
        'title': _0x2a5457 + 1,
        'description': _0x485063.data.data.moviedata.seasons[_0x2a5457].title + " | " + _0x485063.data.data.moviedata.seasons[_0x2a5457].number + " | " + _0x485063.data.data.moviedata.seasons[_0x2a5457].date,
        'rowId': _0x3b2d3c + ("slanimedl " + _0x485063.data.data.moviedata.seasons[_0x2a5457].link + '|' + _0x485063.data.data.moviedata.seasons[_0x2a5457].title)
      });
    }
    const _0x53dc9b = {
      title: "_[Result from slanimeclub.]_",
      rows: _0x34eb73
    };
    const _0x2f8be9 = [_0x53dc9b];
    const _0x1a2896 = {
      url: _0x485063.data.data.moviedata.image
    };
    const _0x146fa8 = {
      caption: _0x435195,
      image: _0x1a2896,
      footer: config.FOOTER,
      title: "Result from slanimeclub. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x2f8be9
    };
    const _0x5c301f = {
      quoted: _0x3422b8
    };
    return await _0x1116ab.replyList(_0x39fa6a, _0x146fa8, _0x5c301f);
  } catch (_0x18ad86) {
    _0x8d144("*ERROR !!*");
    _0x2f2a39(_0x18ad86);
  }
});
const _0x1d056a = {
  pattern: "slanimedl",
  react: '📥',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x1d056a, async (_0x4d952d, _0x35bd88, _0x8dffea, {
  from: _0x15efa1,
  q: _0x758df7,
  isDev: _0x31fce0,
  reply: _0x1efe8a
}) => {
  if (!_0x758df7) {
    return await _0x1efe8a("*Please provide a direct URL!*");
  }
  try {
    const _0x40b0fc = _0x758df7.split('|')[0];
    const _0xbee6f0 = _0x758df7.split('|')[1] || "tdd_movie_dl_system";
    const _0x3b3c8c = await fetchJson(config.API + "/api/slanimeclub/download?url=" + _0x40b0fc + "&apikey=" + config.APIKEY);
    const _0x3b4a5d = '' + _0x3b3c8c.data.data.link;
    _0x1efe8a("╭═════════════════❀\n│  UPLOADING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀");
    if (_0x3b4a5d.includes("https://slanimeclub.co")) {
      const _0x271896 = {
        'document': await getBuffer(_0x3b4a5d),
        'caption': _0xbee6f0 + "\n\n" + config.FOOTER,
        'mimetype': "video/mp4",
        'fileName': _0xbee6f0 + ".mp4"
      };
      await _0x4d952d.sendMessage(_0x15efa1, _0x271896);
    }
    if (_0x3b4a5d.includes("https://drive.google.com")) {
      let _0x344c69 = await GDriveDl(_0x3b4a5d);
      let _0x424e68 = "*[ Downloading file ]*\n\n";
      _0x424e68 += "*Name :* " + _0x344c69.fileName + "\n";
      _0x424e68 += "*Size :* " + _0x344c69.fileSize + "\n";
      _0x424e68 += "*Type :* " + _0x344c69.mimetype;
      await _0x1efe8a(_0x424e68);
      const _0x2acb98 = {
        url: _0x344c69.downloadUrl
      };
      const _0x142ce7 = {
        document: _0x2acb98,
        caption: _0x344c69.fileName + "\n\n" + config.FOOTER,
        fileName: _0x344c69.fileName,
        mimetype: _0x344c69.mimetype
      };
      const _0x569212 = {
        quoted: _0x35bd88
      };
      _0x4d952d.sendMessage(_0x15efa1, _0x142ce7, _0x569212);
    }
    const _0x29b00a = {
      text: '✅',
      key: _0x35bd88.key
    };
    const _0x3d72b6 = {
      react: _0x29b00a
    };
    await _0x4d952d.sendMessage(_0x15efa1, _0x3d72b6);
  } catch (_0x21eaeb) {
    console.error("Error fetching or sending", _0x21eaeb);
    const _0x12fc75 = {
      quoted: _0x35bd88
    };
    await _0x4d952d.sendMessage(_0x15efa1, "*Error fetching or sending *", _0x12fc75);
  }
});
const _0xd23d20 = {
  pattern: "cinesubz",
  react: '📑',
  category: "movie",
  desc: "cinesubz moive downloader",
  filename: __filename
};
cmd(_0xd23d20, async (_0x2f1c6a, _0x382a51, _0x188c15, {
  from: _0x546c4a,
  prefix: _0x477d18,
  q: _0x1d7825,
  l: _0x39ffdd,
  isDev: _0x4bc854,
  reply: _0x561ac6
}) => {
  try {
    if (!_0x1d7825) {
      return await _0x561ac6("*Please Give Me Text..! 🖊️*");
    }
    const _0x2e3aa = await fetchJson(config.API + "/api/cinesubz/search?q=" + _0x1d7825 + "&apikey=" + config.APIKEY);
    const _0x32b42a = {
      quoted: _0x188c15
    };
    if (_0x2e3aa.data.data.data.length < 1) {
      return await _0x2f1c6a.sendMessage(_0x546c4a, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x32b42a);
    }
    var _0x2e91f5 = [];
    for (var _0xa1d8d5 = 0; _0xa1d8d5 < _0x2e3aa.data.data.data.length; _0xa1d8d5++) {
      _0x2e91f5.push({
        'title': _0xa1d8d5 + 1,
        'description': _0x2e3aa.data.data.data[_0xa1d8d5].title,
        'rowId': _0x477d18 + "cine " + _0x2e3aa.data.data.data[_0xa1d8d5].link
      });
    }
    const _0x118b01 = {
      title: "_[Result from cinesubz.]_",
      rows: _0x2e91f5
    };
    const _0x52fad8 = [_0x118b01];
    const _0x301605 = {
      text: '',
      footer: config.FOOTER,
      title: "Result from cinesubz. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x52fad8
    };
    const _0x466ce7 = {
      quoted: _0x188c15
    };
    return await _0x2f1c6a.replyList(_0x546c4a, _0x301605, _0x466ce7);
  } catch (_0x493114) {
    _0x561ac6("*ERROR !!*");
    _0x39ffdd(_0x493114);
  }
});
const _0x5a4fd1 = {
  pattern: "cine",
  react: '📑',
  filename: __filename
};
cmd(_0x5a4fd1, async (_0x377633, _0x470df0, _0x17f0c2, {
  from: _0x25ec03,
  prefix: _0x3f1289,
  q: _0x4b2c36,
  l: _0x1bab78,
  isDev: _0x5b5ee0,
  reply: _0x51caff
}) => {
  try {
    if (!_0x4b2c36) {
      return await _0x51caff("*Please Give Me Text..! 🖊️*");
    }
    const _0x1b79fc = await fetchJson(config.API + "/api/cinesubz/movie?url=" + _0x4b2c36 + "&apikey=" + config.APIKEY);
    const _0x24e9e3 = "*_☘ Title: " + _0x1b79fc.data.data.moviedata.title + "_*\n\n- *Year:* " + _0x1b79fc.data.data.mainDetails.dateCreated + "\n- *Rating:* " + _0x1b79fc.data.data.mainDetails.runtime + "\n- *Count* " + _0x1b79fc.data.data.mainDetails.rating.count + "\n- *Value* " + _0x1b79fc.data.data.mainDetails.rating.value + "\n\n*⛏️ Link:* " + _0x4b2c36;
    const _0xc428c3 = await axios.get(_0x4b2c36);
    const _0x577b53 = cheerio.load(_0xc428c3.data);
    const _0x680879 = _0x577b53("div.poster > img").attr("src");
    const _0x4dd42c = _0x577b53("div.data > h1").text();
    const _0x557305 = _0x577b53("span > a").text();
    const _0xfc89a3 = _0x577b53("div.data > div.sgeneros > a").text();
    const _0x4a9c12 = _0x577b53("div.extra > span.date").text();
    const _0x459c77 = _0x577b53("#repimdb > strong").text();
    const _0x5a25aa = [];
    _0x577b53("div.se-a > ul.episodios > li").each((_0xd1320d, _0x598db5) => {
      _0x5a25aa.push({
        'link': _0x577b53(_0x598db5).find('a').attr("href"),
        'id': _0x577b53(_0x598db5).find("div.numerando").text(),
        'title': _0x577b53(_0x598db5).find("div.episodiotitle > a").text()
      });
    });
    const _0x2167f8 = "*_☘ Title: " + _0x4dd42c + "*\n\n- *Year:* " + _0x4a9c12 + "\n- *Rating:* " + _0x459c77 + "\n- *Type:* " + _0x557305 + "\n- *Generos:* " + _0xfc89a3 + "\n\n⛏️ *Link:* " + _0x4b2c36;
    if (_0x4b2c36.includes("https://cinesubz.co/movies")) {
      const _0x4a796e = {
        quoted: _0x17f0c2
      };
      if (_0x1b79fc.data.data.dllinks.directDownloadLinks.length < 1) {
        return await _0x377633.sendMessage(_0x25ec03, {
          'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
        }, _0x4a796e);
      }
      var _0x576314 = [];
      for (var _0x9cfae9 = 0; _0x9cfae9 < _0x1b79fc.data.data.dllinks.directDownloadLinks.length; _0x9cfae9++) {
        _0x576314.push({
          'title': _0x9cfae9 + 1,
          'description': _0x1b79fc.data.data.dllinks.directDownloadLinks[_0x9cfae9].quality + " | " + _0x1b79fc.data.data.dllinks.directDownloadLinks[_0x9cfae9].size,
          'rowId': _0x3f1289 + ("cinedls " + _0x1b79fc.data.data.dllinks.directDownloadLinks[_0x9cfae9].link)
        });
      }
      const _0xf6a247 = {
        title: "_Select Movie_",
        rows: _0x576314
      };
      const _0x4ed143 = [_0xf6a247, {
        'title': "*🎬 MOVIE INFO 🎬*",
        'rows': [{
          'title': "    1.1",
          'rowId': _0x3f1289 + ("cines " + _0x4b2c36),
          'description': "Send Movie Details 📄"
        }]
      }, {
        'title': "*🎬 MOVIE IMAGES 🎬*",
        'rows': [{
          'title': "    1.2",
          'rowId': _0x3f1289 + ("cinei " + _0x4b2c36),
          'description': "Send Movie IMAGES 🏞️"
        }]
      }];
      const _0x372ed0 = {
        url: _0x1b79fc.data.data.mainDetails.imageUrl
      };
      const _0x5b56e0 = {
        caption: _0x24e9e3,
        image: _0x372ed0,
        footer: config.FOOTER,
        title: '',
        buttonText: "*🔢 Reply below number*",
        sections: _0x4ed143
      };
      const _0x48f180 = {
        quoted: _0x17f0c2
      };
      return await _0x377633.replyList(_0x25ec03, _0x5b56e0, _0x48f180);
    }
    if (_0x4b2c36.includes("https://cinesubz.co/tvshows")) {
      const _0x4967b9 = {
        quoted: _0x17f0c2
      };
      if (_0x5a25aa.length < 1) {
        return await _0x377633.sendMessage(_0x25ec03, {
          'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
        }, _0x4967b9);
      }
      var _0x576314 = [];
      for (var _0x9cfae9 = 0; _0x9cfae9 < _0x5a25aa.length; _0x9cfae9++) {
        _0x576314.push({
          'title': _0x9cfae9 + 1,
          'description': _0x5a25aa[_0x9cfae9].title + " | " + _0x5a25aa[_0x9cfae9].id,
          'rowId': _0x3f1289 + ("cinetv " + _0x5a25aa[_0x9cfae9].link)
        });
      }
      const _0x4eca55 = {
        title: "_Select Episode_",
        rows: _0x576314
      };
      const _0x4004e1 = [_0x4eca55, {
        'title': "*🎬 MOVIE INFO 🎬*",
        'rows': [{
          'title': "    1.1",
          'rowId': _0x3f1289 + ("cines " + _0x4b2c36),
          'description': "Send Movie Details 📄"
        }]
      }, {
        'title': "*🎬 MOVIE IMAGES 🎬*",
        'rows': [{
          'title': "    1.2",
          'rowId': _0x3f1289 + ("cinei " + _0x4b2c36),
          'description': "Send Movie IMAGES 🏞️"
        }]
      }];
      const _0x51469a = {
        url: _0x680879
      };
      const _0x183748 = {
        caption: _0x2167f8,
        image: _0x51469a,
        footer: config.FOOTER,
        title: '',
        buttonText: "*🔢 Reply below number*",
        sections: _0x4004e1
      };
      const _0x56556c = {
        quoted: _0x17f0c2
      };
      return await _0x377633.replyList(_0x25ec03, _0x183748, _0x56556c);
    }
  } catch (_0x2d9394) {
    _0x51caff("*ERROR !!*");
    _0x1bab78(_0x2d9394);
  }
});
const _0x1951e6 = {
  pattern: "cinetv",
  react: '📑',
  filename: __filename
};
cmd(_0x1951e6, async (_0x274b50, _0x45e3ed, _0x1ee160, {
  from: _0x3b10d9,
  prefix: _0x4c86de,
  q: _0x310b70,
  l: _0x1da58e,
  isDev: _0x544196,
  reply: _0x109901
}) => {
  try {
    if (!_0x310b70) {
      return await _0x109901("*Please Give Me Text..! 🖊️*");
    }
    const _0x190e3c = await fetchJson(config.API + "/api/cinesubz/episode?url=" + _0x310b70 + "&apikey=" + config.APIKEY);
    const _0x16d937 = {
      quoted: _0x1ee160
    };
    if (_0x190e3c.data.data.dllinks.directDownloadLinks.length < 1) {
      return await _0x274b50.sendMessage(_0x3b10d9, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x16d937);
    }
    var _0xf0e823 = [];
    for (var _0x55a272 = 0; _0x55a272 < _0x190e3c.data.data.dllinks.directDownloadLinks.length; _0x55a272++) {
      _0xf0e823.push({
        'title': _0x55a272 + 1,
        'description': _0x190e3c.data.data.dllinks.directDownloadLinks[_0x55a272].quality + " | " + _0x190e3c.data.data.dllinks.directDownloadLinks[_0x55a272].size,
        'rowId': _0x4c86de + ("cinedls " + _0x190e3c.data.data.dllinks.directDownloadLinks[_0x55a272].link)
      });
    }
    const _0x31e653 = {
      title: "_Select Movie_",
      rows: _0xf0e823
    };
    const _0x259dad = [_0x31e653];
    const _0x4805a5 = {
      caption: "*_☘ Title: " + _0x190e3c.data.data.mainDetails.title + "_*\n\n- *EpisodeTitle:* " + _0x190e3c.data.data.mainDetails.episodeTitle + "\n- *Year:* " + _0x190e3c.data.data.mainDetails.date + "\n- *Completeness* " + _0x190e3c.data.data.mainDetails.completeness + "\n\n*⛏️ Link:* " + _0x310b70,
      image: {},
      footer: config.FOOTER,
      title: '',
      buttonText: "*🔢 Reply below number*",
      sections: _0x259dad
    };
    _0x4805a5.image.url = _0x190e3c.data.data.imageUrls[0];
    const _0x8da086 = {
      quoted: _0x1ee160
    };
    return await _0x274b50.replyList(_0x3b10d9, _0x4805a5, _0x8da086);
  } catch (_0x51ab4e) {
    _0x109901("*ERROR !!*");
    _0x1da58e(_0x51ab4e);
  }
});
const _0x2324e5 = {
  pattern: "cinedls",
  react: '📑',
  filename: __filename
};
cmd(_0x2324e5, async (_0x43e173, _0x298e19, _0x4c3b53, {
  from: _0x198b05,
  prefix: _0x59c3f6,
  q: _0x5de478,
  l: _0x26fce8,
  isDev: _0x38dc87,
  reply: _0xeecb1f
}) => {
  try {
    if (!_0x5de478) {
      return await _0xeecb1f("*Please Give Me Text..! 🖊️*");
    }
    const _0x45cde8 = await fetchJson(config.API + "/api/cinesubz/download?url=" + _0x5de478 + "&apikey=" + config.APIKEY);
    const _0x44f0dc = _0x45cde8.data.data;
    if (!_0x44f0dc || _0x44f0dc.length === 0) {
      return _0xeecb1f("No download links found.");
    }
    let _0x1b4a39 = "*🎥 Cinesubz Download Links 🎥*\n\n";
    _0x44f0dc.forEach((_0x3c3a3b, _0x37d40) => {
      _0x1b4a39 += '*' + (_0x37d40 + 1) + ". " + _0x3c3a3b.fileName + "*\n";
      _0x1b4a39 += "📦 Size: " + _0x3c3a3b.fileSize + "\n";
      _0x1b4a39 += "🔗 Type: " + _0x3c3a3b.type + "\n===============================\n";
    });
    const _0x28659d = {
      quoted: _0x4c3b53
    };
    if (_0x44f0dc < 1) {
      return await _0x43e173.sendMessage(_0x198b05, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x28659d);
    }
    var _0x29e14f = [];
    for (var _0x42048f = 0; _0x42048f < _0x44f0dc.length; _0x42048f++) {
      _0x29e14f.push({
        'title': _0x42048f + 1,
        'description': _0x44f0dc[_0x42048f].type + " | " + _0x44f0dc[_0x42048f].fileSize,
        'rowId': _0x59c3f6 + ("cinedl " + _0x44f0dc[_0x42048f].href + '|' + _0x44f0dc[_0x42048f].fileName)
      });
    }
    const _0x917617 = {
      title: "_[Result from cinesubz.]_",
      rows: _0x29e14f
    };
    const _0x3b4043 = [_0x917617];
    const _0x46f523 = {
      text: _0x1b4a39,
      footer: config.FOOTER,
      title: "Result from cinesubz. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x3b4043
    };
    const _0x291dbe = {
      quoted: _0x4c3b53
    };
    return await _0x43e173.replyList(_0x198b05, _0x46f523, _0x291dbe);
  } catch (_0x5f484f) {
    _0xeecb1f("*ERROR !!*");
    _0x26fce8(_0x5f484f);
  }
});
const _0x14e422 = {
  pattern: "cines",
  react: '⬆',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x14e422, async (_0x2330e9, _0x4b6a15, _0x3becfa, {
  reply: _0x23f2fd,
  isDev: _0x453b12,
  from: _0x516b46,
  q: _0x3a7b48,
  prefix: _0x1e706b
}) => {
  try {
    if (!_0x3a7b48) {
      return await _0x23f2fd("*Please Give Me Link..! 🖊️*");
    }
    if (_0x3a7b48.includes("https://cinesubz.co/movies")) {
      const _0xccd430 = await fetchJson(config.API + "/api/cinesubz/movie?url=" + _0x3a7b48 + "&apikey=" + config.APIKEY);
      const _0x1a334c = "*_☘ Title: " + _0xccd430.data.data.moviedata.title + "_*\n\n- *Year:* " + _0xccd430.data.data.mainDetails.dateCreated + "\n- *Rating:* " + _0xccd430.data.data.mainDetails.runtime + "\n- *Count* " + _0xccd430.data.data.mainDetails.rating.count + "\n- *Value* " + _0xccd430.data.data.mainDetails.rating.value + "\n\n*⛏️ Link:* " + _0x3a7b48 + "\n\n" + config.FOOTER;
      const _0x2827a9 = {
        url: _0xccd430.data.data.mainDetails.imageUrl
      };
      const _0x5a596e = {
        image: _0x2827a9,
        caption: _0x1a334c
      };
      const _0x5c0ade = {
        quoted: _0x4b6a15
      };
      return await _0x2330e9.sendMessage(_0x516b46, _0x5a596e, _0x5c0ade);
      const _0x374fc7 = {
        text: '✅',
        key: _0x4b6a15.key
      };
      const _0x4bff5a = {
        react: _0x374fc7
      };
      await _0x2330e9.sendMessage(_0x516b46, _0x4bff5a);
    }
    if (_0x3a7b48.includes("https://cinesubz.co/tvshows")) {
      const _0x33d201 = await fetchJson(config.API + "/api/cinesubz/episodes?url=" + _0x3a7b48 + "&apikey=" + config.APIKEY);
      const _0xcc8349 = "*_☘ Title: " + _0x33d201.data.data.mainDetails.title + "_*\n\n- *EpisodeTitle:* " + _0x33d201.data.data.mainDetails.episodeTitle + "\n- *Year:* " + _0x33d201.data.data.mainDetails.date + "\n- *Completeness* " + _0x33d201.data.data.mainDetails.completeness + "\n\n*⛏️ Link:* " + _0x3a7b48 + "\n\n" + config.FOOTER;
      const _0x13aa4b = {
        url: _0x33d201.data.data.mainDetails.imageUrl
      };
      const _0x1f84e9 = {
        image: _0x13aa4b,
        caption: _0xcc8349
      };
      const _0x48bd61 = {
        quoted: _0x4b6a15
      };
      return await _0x2330e9.sendMessage(_0x516b46, _0x1f84e9, _0x48bd61);
      const _0x2dc0bc = {
        text: '✅',
        key: _0x4b6a15.key
      };
      const _0xf229a = {
        react: _0x2dc0bc
      };
      await _0x2330e9.sendMessage(_0x516b46, _0xf229a);
    }
  } catch (_0x8c185c) {
    _0x23f2fd("*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1");
    console.log(_0x8c185c);
  }
});
const _0x3a6214 = {
  pattern: "cinei",
  react: '⬆',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x3a6214, async (_0x50f0dc, _0x1bf0d0, _0x23921e, {
  reply: _0x22517a,
  isDev: _0xd3fa24,
  from: _0x1ae372,
  q: _0x4b31c1,
  prefix: _0x3864a4
}) => {
  try {
    if (!_0x4b31c1) {
      return await _0x22517a("*Please Give Me Link..! 🖊️*");
    }
    if (_0x4b31c1.includes("https://cinesubz.co/movies")) {
      const _0x4bebb2 = await fetchJson(config.API + "/api/cinesubz/movie?url=" + _0x4b31c1 + "&apikey=" + config.APIKEY);
      const _0x3f3015 = config.FOOTER;
      _0x22517a("UPLOADING MOVIE IMAGES 🔄");
      const _0x6571d = {
        url: _0x4bebb2.data.data.moviedata.imageUrls[0]
      };
      const _0x37f916 = {
        image: _0x6571d,
        caption: _0x3f3015
      };
      const _0x24d127 = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x37f916, _0x24d127);
      const _0x5db4ff = {
        url: _0x4bebb2.data.data.moviedata.imageUrls[1]
      };
      const _0x147764 = {
        image: _0x5db4ff,
        caption: _0x3f3015
      };
      const _0x48cf1a = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x147764, _0x48cf1a);
      const _0x29d48e = {
        url: _0x4bebb2.data.data.moviedata.imageUrls[2]
      };
      const _0xa489e5 = {
        image: _0x29d48e,
        caption: _0x3f3015
      };
      const _0x17b81f = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0xa489e5, _0x17b81f);
      const _0x1df3be = {
        url: _0x4bebb2.data.data.moviedata.imageUrls[4]
      };
      const _0x40658f = {
        image: _0x1df3be,
        caption: _0x3f3015
      };
      const _0x458853 = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x40658f, _0x458853);
      const _0x22798d = {
        url: _0x4bebb2.data.data.moviedata.imageUrls[5]
      };
      const _0xf1b08c = {
        image: _0x22798d,
        caption: _0x3f3015
      };
      const _0x2c0489 = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0xf1b08c, _0x2c0489);
      const _0x42824b = {
        text: '✅',
        key: _0x1bf0d0.key
      };
      const _0x4242d8 = {
        react: _0x42824b
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x4242d8);
    }
    if (_0x4b31c1.includes("https://cinesubz.co/tvshows")) {
      const _0x2b9965 = await fetchJson(config.API + "/api/sinhalasubs/episodes?url=" + _0x4b31c1 + "&apikey=" + config.APIKEY);
      const _0x4687ca = config.FOOTER;
      _0x22517a("UPLOADING MOVIE IMAGES 🔄");
      const _0x19f3ad = {
        url: _0x2b9965.data.data.imageUrls[0]
      };
      const _0x18609a = {
        image: _0x19f3ad,
        caption: _0x4687ca
      };
      const _0x26f72e = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x18609a, _0x26f72e);
      const _0x59f29b = {
        url: _0x2b9965.data.data.imageUrls[1]
      };
      const _0x177cf4 = {
        image: _0x59f29b,
        caption: _0x4687ca
      };
      const _0x2f958e = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x177cf4, _0x2f958e);
      const _0x3a024a = {
        url: _0x2b9965.data.data.imageUrls[2]
      };
      const _0x22badc = {
        image: _0x3a024a,
        caption: _0x4687ca
      };
      const _0x19e0f2 = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x22badc, _0x19e0f2);
      const _0x47951e = {
        url: _0x2b9965.data.data.imageUrls[4]
      };
      const _0x5dab5c = {
        image: _0x47951e,
        caption: _0x4687ca
      };
      const _0x3fa86d = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x5dab5c, _0x3fa86d);
      const _0x2c5db7 = {
        url: _0x2b9965.data.data.imageUrls[5]
      };
      const _0x55ef54 = {
        image: _0x2c5db7,
        caption: _0x4687ca
      };
      const _0x2062e3 = {
        quoted: _0x1bf0d0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x55ef54, _0x2062e3);
      const _0x3669e0 = {
        text: '✅',
        key: _0x1bf0d0.key
      };
      const _0x225008 = {
        react: _0x3669e0
      };
      await _0x50f0dc.sendMessage(_0x1ae372, _0x225008);
    }
  } catch (_0x4fe480) {
    _0x22517a("*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1");
    console.log(_0x4fe480);
  }
});
const _0xc3c7e5 = {
  pattern: "cinedl",
  react: '📥',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0xc3c7e5, async (_0x577829, _0x240cbf, _0x6ba718, {
  from: _0x39506b,
  q: _0x1675b2,
  isDev: _0x581f34,
  reply: _0x53df5c
}) => {
  if (!_0x1675b2) {
    return await _0x53df5c("*Please provide a direct URL!*");
  }
  try {
    const _0x25e67c = _0x1675b2.split('|')[0];
    const _0x502458 = _0x1675b2.split('|')[1] || "tdd_movie_dl_system";
    _0x53df5c("╭═════════════════❀\n│  UPLOADING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀");
    if (_0x1675b2.includes("https://pixeldrain.com")) {
      const _0x57c326 = {
        'document': await getBuffer(_0x25e67c),
        'caption': _0x502458 + "\n\n" + config.FOOTER,
        'mimetype': "video/mp4",
        'fileName': _0x502458 + ".mp4"
      };
      await _0x577829.sendMessage(_0x39506b, _0x57c326);
    }
    if (_0x1675b2.includes("https://06.cscloud12.online")) {
      const _0x135d8b = {
        'document': await getBuffer(_0x25e67c),
        'caption': _0x502458 + "\n\n" + config.FOOTER,
        'mimetype': "video/mp4",
        'fileName': _0x502458 + ".mp4"
      };
      await _0x577829.sendMessage(_0x39506b, _0x135d8b);
    }
    if (_0x1675b2.includes("https://drive.usercontent.google.com")) {
      let _0x51d921 = _0x25e67c.match(/id=([a-zA-Z0-9_-]+)/)[1];
      const _0x463c98 = "https://drive.google.com/file/d/" + _0x51d921 + "/view";
      let _0xc10916 = await GDriveDl(_0x463c98);
      let _0x244321 = "*[ Downloading file ]*\n\n";
      _0x244321 += "*Name :* " + _0xc10916.fileName + "\n";
      _0x244321 += "*Size :* " + _0xc10916.fileSize + "\n";
      _0x244321 += "*Type :* " + _0xc10916.mimetype;
      await _0x53df5c(_0x244321);
      const _0x3a38c0 = {
        url: _0xc10916.downloadUrl
      };
      const _0x28dd9c = {
        document: _0x3a38c0,
        caption: _0xc10916.fileName + "\n\n" + config.FOOTER,
        fileName: _0xc10916.fileName,
        mimetype: _0xc10916.mimetype
      };
      const _0x5afca0 = {
        quoted: _0x240cbf
      };
      _0x577829.sendMessage(_0x39506b, _0x28dd9c, _0x5afca0);
    }
    const _0x558209 = {
      text: '✅',
      key: _0x240cbf.key
    };
    const _0x32b8e4 = {
      react: _0x558209
    };
    await _0x577829.sendMessage(_0x39506b, _0x32b8e4);
  } catch (_0x1ef9c1) {
    console.error("Error fetching or sending", _0x1ef9c1);
    const _0x2dc2e6 = {
      quoted: _0x240cbf
    };
    await _0x577829.sendMessage(_0x39506b, "*Error fetching or sending *", _0x2dc2e6);
  }
});
const _0x3d46f6 = {
  pattern: "sinhalasub",
  react: '📑',
  category: "movie",
  desc: "pirate moive downloader",
  filename: __filename
};
cmd(_0x3d46f6, async (_0x3ee0f3, _0x416758, _0x118a0f, {
  from: _0xe087fc,
  prefix: _0x2c7259,
  q: _0x5533bd,
  l: _0xd1118c,
  isDev: _0x14f1ea,
  reply: _0x34abe9
}) => {
  try {
    if (!_0x5533bd) {
      return await _0x34abe9("*Please Give Me Text..! 🖊️*");
    }
    const _0x33e354 = await fetchJson(config.API + "/api/sinhalasubs/search?q=" + _0x5533bd + "&apikey=" + config.APIKEY);
    const _0x37d563 = {
      quoted: _0x118a0f
    };
    if (_0x33e354.data.data.data.length < 1) {
      return await _0x3ee0f3.sendMessage(_0xe087fc, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x37d563);
    }
    var _0x2fc6fc = [];
    for (var _0x272b82 = 0; _0x272b82 < _0x33e354.data.data.data.length; _0x272b82++) {
      _0x2fc6fc.push({
        'title': _0x272b82 + 1,
        'description': _0x33e354.data.data.data[_0x272b82].title,
        'rowId': _0x2c7259 + "subin " + _0x33e354.data.data.data[_0x272b82].link
      });
    }
    const _0x224fd0 = {
      title: "_[Result from sinhalasub.]_",
      rows: _0x2fc6fc
    };
    const _0xf28721 = [_0x224fd0];
    const _0xa51675 = {
      text: '',
      footer: config.FOOTER,
      title: "Result from sinhalasub. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0xf28721
    };
    const _0xfb3c49 = {
      quoted: _0x118a0f
    };
    return await _0x3ee0f3.replyList(_0xe087fc, _0xa51675, _0xfb3c49);
  } catch (_0x20bc38) {
    _0x34abe9("*ERROR !!*");
    _0xd1118c(_0x20bc38);
  }
});
const _0x4626ac = {
  pattern: "subin",
  react: '📑',
  filename: __filename
};
cmd(_0x4626ac, async (_0x1910be, _0x57eab5, _0x47137f, {
  from: _0x563c89,
  prefix: _0x115d85,
  q: _0x44b98f,
  l: _0x276377,
  isDev: _0x28cd55,
  reply: _0x18d63c
}) => {
  try {
    if (!_0x44b98f) {
      return await _0x18d63c("*Please Give Me Text..! 🖊️*");
    }
    const _0x4fdd67 = await fetchJson(config.API + "/api/sinhalasubs/movie?url=" + _0x44b98f + "&apikey=" + config.APIKEY);
    const _0x1fd21a = "*_☘ Title: " + _0x4fdd67.data.data.mainDetails.maintitle + "_*\n\n- *Year:* " + _0x4fdd67.data.data.mainDetails.dateCreated + "\n- *Rating:* " + _0x4fdd67.data.data.mainDetails.runtime + "\n- *ImdbRating* " + _0x4fdd67.data.data.moviedata.imdbRating + "\n- *ImdbvotesCount* " + _0x4fdd67.data.data.moviedata.imdbvotesCount + "\n\n*⛏️ Link:* " + _0x44b98f;
    const _0x4d1b9b = await fetchJson(config.API + "/api/sinhalasubs/tvshow?url=" + _0x44b98f + "&apikey=" + config.APIKEY);
    const _0x2bb601 = await axios.get(_0x44b98f);
    const _0x574ed8 = cheerio.load(_0x2bb601.data);
    const _0x28e73d = [];
    _0x574ed8("ul.episodios > li").each((_0xf35285, _0x17749f) => {
      _0x28e73d.push({
        'link': _0x574ed8(_0x17749f).find("div.episodiotitle > a").attr("href"),
        'title1': _0x574ed8(_0x17749f).find("div.numerando").text(),
        'episode': _0x574ed8(_0x17749f).find("div.episodiotitle > a").text()
      });
    });
    const _0x10283a = "*_☘ Title: " + _0x4fdd67.data.data.mainDetails.maintitle + "*\n\n- *Year:* " + _0x4d1b9b.data.data.mainDetails.dateCreated + "\n- *Rating:* " + _0x4d1b9b.data.data.mainDetails.rating.value + " || " + _0x4d1b9b.data.data.mainDetails.rating.count + "\n- *Generos:* " + _0x4d1b9b.data.data.mainDetails.genres[0] + " " + _0x4d1b9b.data.data.mainDetails.genres[1] + "\n\n⛏️ *Link:* " + _0x44b98f;
    if (_0x44b98f.includes("https://sinhalasub.lk/movies")) {
      const _0xd291a3 = {
        quoted: _0x47137f
      };
      if (_0x4fdd67.data.data.dllinks.directDownloadLinks.length < 1) {
        return await _0x1910be.sendMessage(_0x563c89, {
          'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
        }, _0xd291a3);
      }
      var _0x14251c = [];
      for (var _0x3f8145 = 0; _0x3f8145 < _0x4fdd67.data.data.dllinks.directDownloadLinks.length; _0x3f8145++) {
        _0x14251c.push({
          'title': _0x3f8145 + 1,
          'description': _0x4fdd67.data.data.dllinks.directDownloadLinks[_0x3f8145].quality + " | " + _0x4fdd67.data.data.dllinks.directDownloadLinks[_0x3f8145].size,
          'rowId': _0x115d85 + ("subdl " + _0x4fdd67.data.data.dllinks.directDownloadLinks[_0x3f8145].link + '|' + _0x4fdd67.data.data.mainDetails.maintitle + '|' + _0x4fdd67.data.data.moviedata.imageUrls[0])
        });
      }
      const _0x1ba263 = {
        title: "_Select Movie_",
        rows: _0x14251c
      };
      const _0x6a7d80 = [_0x1ba263, {
        'title': "*🎬 MOVIE INFO 🎬*",
        'rows': [{
          'title': "    1.1",
          'rowId': _0x115d85 + ("subins " + _0x44b98f),
          'description': "Send Movie Details 📄"
        }]
      }, {
        'title': "*🎬 MOVIE IMAGES 🎬*",
        'rows': [{
          'title': "    1.2",
          'rowId': _0x115d85 + ("subini " + _0x44b98f),
          'description': "Send Movie IMAGES 🏞️"
        }]
      }];
      const _0x1a757d = {
        url: _0x4fdd67.data.data.moviedata.imageUrls[0]
      };
      const _0x2eea8d = {
        caption: _0x1fd21a,
        image: _0x1a757d,
        footer: config.FOOTER,
        title: '',
        buttonText: "*🔢 Reply below number*",
        sections: _0x6a7d80
      };
      const _0x2672e1 = {
        quoted: _0x47137f
      };
      return await _0x1910be.replyList(_0x563c89, _0x2eea8d, _0x2672e1);
    }
    if (_0x44b98f.includes("https://sinhalasub.lk/tvshows")) {
      const _0x7a6c90 = {
        quoted: _0x47137f
      };
      if (_0x28e73d.length < 1) {
        return await _0x1910be.sendMessage(_0x563c89, {
          'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
        }, _0x7a6c90);
      }
      var _0x14251c = [];
      for (var _0x3f8145 = 0; _0x3f8145 < _0x28e73d.length; _0x3f8145++) {
        _0x14251c.push({
          'title': _0x3f8145 + 1,
          'description': _0x28e73d[_0x3f8145].title1 + " | " + _0x28e73d[_0x3f8145].episode,
          'rowId': _0x115d85 + ("subintv " + _0x28e73d[_0x3f8145].link)
        });
      }
      const _0x177d75 = {
        title: "_Select Episode_",
        rows: _0x14251c
      };
      const _0x539000 = [_0x177d75, {
        'title': "*🎬 MOVIE INFO 🎬*",
        'rows': [{
          'title': "    1.1",
          'rowId': _0x115d85 + ("subins " + _0x44b98f),
          'description': "Send Movie Details 📄"
        }]
      }, {
        'title': "*🎬 MOVIE IMAGES 🎬*",
        'rows': [{
          'title': "    1.2",
          'rowId': _0x115d85 + ("subini " + _0x44b98f),
          'description': "Send Movie IMAGES 🏞️"
        }]
      }];
      const _0x5e1d6b = {
        url: _0x4d1b9b.data.data.imageUrls[0]
      };
      const _0x40fa0b = {
        caption: _0x10283a,
        image: _0x5e1d6b,
        footer: config.FOOTER,
        title: '',
        buttonText: "*🔢 Reply below number*",
        sections: _0x539000
      };
      const _0x1c61a3 = {
        quoted: _0x47137f
      };
      return await _0x1910be.replyList(_0x563c89, _0x40fa0b, _0x1c61a3);
    }
  } catch (_0x29f0c6) {
    _0x18d63c("*ERROR !!*");
    _0x276377(_0x29f0c6);
  }
});
const _0x1a1d2e = {
  pattern: "subins",
  react: '⬆',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x1a1d2e, async (_0x232d00, _0x3d1603, _0x15611c, {
  reply: _0x4a2048,
  isDev: _0x467738,
  from: _0x1b13c5,
  q: _0x5a3b21,
  prefix: _0x3943d7
}) => {
  try {
    if (!_0x5a3b21) {
      return await _0x4a2048("*Please Give Me Link..! 🖊️*");
    }
    if (_0x5a3b21.includes("https://sinhalasub.lk/movies")) {
      const _0x32e365 = await fetchJson(config.API + "/api/sinhalasubs/movie?url=" + _0x5a3b21 + "&apikey=" + config.APIKEY);
      const _0x1d35e6 = "*_☘ Title: " + _0x32e365.data.data.mainDetails.maintitle + "_*\n\n- *Year:* " + _0x32e365.data.data.mainDetails.dateCreated + "\n- *Rating:* " + _0x32e365.data.data.mainDetails.runtime + "\n- *ImdbRating* " + _0x32e365.data.data.moviedata.imdbRating + "\n- *ImdbvotesCount* " + _0x32e365.data.data.moviedata.imdbvotesCount + "\n\n*⛏️ Link:* " + _0x5a3b21 + "\n\n" + config.FOOTER;
      const _0x521ccb = {
        url: _0x32e365.data.data.moviedata.imageUrls[0]
      };
      const _0x33e76a = {
        image: _0x521ccb,
        caption: _0x1d35e6
      };
      const _0x1875d4 = {
        quoted: _0x3d1603
      };
      return await _0x232d00.sendMessage(_0x1b13c5, _0x33e76a, _0x1875d4);
      const _0x2f027c = {
        text: '✅',
        key: _0x3d1603.key
      };
      const _0x1f1e8c = {
        react: _0x2f027c
      };
      await _0x232d00.sendMessage(_0x1b13c5, _0x1f1e8c);
    }
    if (_0x5a3b21.includes("https://sinhalasub.lk/tvshows")) {
      const _0x4c3e9b = await fetchJson(config.API + "/api/sinhalasubs/tvshow?url=" + _0x5a3b21 + "&apikey=" + config.APIKEY);
      const _0x3df3fe = "*_☘ Title: " + _0x4c3e9b.data.data.mainDetails.maintitle + "*\n\n- *Year:* " + _0x4c3e9b.data.data.mainDetails.dateCreated + "\n- *Rating:* " + _0x4c3e9b.data.data.mainDetails.rating.value + " || " + _0x4c3e9b.data.data.mainDetails.rating.count + "\n- *Generos:* " + _0x4c3e9b.data.data.mainDetails.genres[0] + " " + _0x4c3e9b.data.data.mainDetails.genres[1] + "\n\n*⛏️ Link:* " + _0x5a3b21 + "\n\n" + config.FOOTER;
      const _0x1c2b87 = {
        url: _0x4c3e9b.data.data.imageUrls[0]
      };
      const _0x1abc05 = {
        image: _0x1c2b87,
        caption: _0x3df3fe
      };
      const _0x2cd10d = {
        quoted: _0x3d1603
      };
      return await _0x232d00.sendMessage(_0x1b13c5, _0x1abc05, _0x2cd10d);
      const _0x5c2189 = {
        text: '✅',
        key: _0x3d1603.key
      };
      const _0x82c900 = {
        react: _0x5c2189
      };
      await _0x232d00.sendMessage(_0x1b13c5, _0x82c900);
    }
  } catch (_0x11f645) {
    _0x4a2048("*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1");
    console.log(_0x11f645);
  }
});
const _0x2021d6 = {
  pattern: "subini",
  react: '⬆',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x2021d6, async (_0x125321, _0x5a1ebd, _0x4f44b5, {
  reply: _0x36cbbe,
  isDev: _0x2c12de,
  from: _0x5001f8,
  q: _0x18045a,
  prefix: _0xf89277
}) => {
  try {
    if (!_0x18045a) {
      return await _0x36cbbe("*Please Give Me Link..! 🖊️*");
    }
    if (_0x18045a.includes("https://sinhalasub.lk/movies")) {
      const _0x77281f = await fetchJson(config.API + "/api/sinhalasubs/movie?url=" + _0x18045a + "&apikey=" + config.APIKEY);
      const _0x533f01 = config.FOOTER;
      _0x36cbbe("UPLOADING MOVIE IMAGES 🔄");
      const _0x4a1da1 = {
        url: _0x77281f.data.data.moviedata.imageUrls[0]
      };
      const _0x30d92a = {
        image: _0x4a1da1,
        caption: _0x533f01
      };
      const _0x319163 = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x30d92a, _0x319163);
      const _0x4eea2b = {
        url: _0x77281f.data.data.moviedata.imageUrls[1]
      };
      const _0x445413 = {
        image: _0x4eea2b,
        caption: _0x533f01
      };
      const _0x47a33a = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x445413, _0x47a33a);
      const _0x3fa229 = {
        url: _0x77281f.data.data.moviedata.imageUrls[2]
      };
      const _0x2955fb = {
        image: _0x3fa229,
        caption: _0x533f01
      };
      const _0x1dcb18 = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x2955fb, _0x1dcb18);
      const _0xae358f = {
        url: _0x77281f.data.data.moviedata.imageUrls[4]
      };
      const _0x579582 = {
        image: _0xae358f,
        caption: _0x533f01
      };
      const _0x5b6ed2 = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x579582, _0x5b6ed2);
      const _0x481595 = {
        url: _0x77281f.data.data.moviedata.imageUrls[5]
      };
      const _0x3f85e9 = {
        image: _0x481595,
        caption: _0x533f01
      };
      const _0x28aa51 = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x3f85e9, _0x28aa51);
      const _0x21aeb4 = {
        text: '✅',
        key: _0x5a1ebd.key
      };
      const _0x3f4d5f = {
        react: _0x21aeb4
      };
      await _0x125321.sendMessage(_0x5001f8, _0x3f4d5f);
    }
    if (_0x18045a.includes("https://sinhalasub.lk/tvshows")) {
      const _0x3b72b2 = await fetchJson(config.API + "/api/sinhalasubs/tvshow?url=" + _0x18045a + "&apikey=" + config.APIKEY);
      const _0x1b913c = config.FOOTER;
      _0x36cbbe("UPLOADING MOVIE IMAGES 🔄");
      const _0x3137a0 = {
        url: _0x3b72b2.data.data.imageUrls[0]
      };
      const _0x4f94eb = {
        image: _0x3137a0,
        caption: _0x1b913c
      };
      const _0x169fe2 = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x4f94eb, _0x169fe2);
      const _0x53985f = {
        url: _0x3b72b2.data.data.imageUrls[1]
      };
      const _0x1b5108 = {
        image: _0x53985f,
        caption: _0x1b913c
      };
      const _0x25eee1 = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x1b5108, _0x25eee1);
      const _0x561e78 = {
        url: _0x3b72b2.data.data.imageUrls[2]
      };
      const _0x2b3acc = {
        image: _0x561e78,
        caption: _0x1b913c
      };
      const _0xf401a2 = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x2b3acc, _0xf401a2);
      const _0x14a13a = {
        url: _0x3b72b2.data.data.imageUrls[4]
      };
      const _0x47bcd2 = {
        image: _0x14a13a,
        caption: _0x1b913c
      };
      const _0xfd0532 = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x47bcd2, _0xfd0532);
      const _0x2171ff = {
        url: _0x3b72b2.data.data.imageUrls[5]
      };
      const _0x1304dd = {
        image: _0x2171ff,
        caption: _0x1b913c
      };
      const _0x5d502b = {
        quoted: _0x5a1ebd
      };
      await _0x125321.sendMessage(_0x5001f8, _0x1304dd, _0x5d502b);
      const _0x4c65bb = {
        text: '✅',
        key: _0x5a1ebd.key
      };
      const _0x30d7e1 = {
        react: _0x4c65bb
      };
      await _0x125321.sendMessage(_0x5001f8, _0x30d7e1);
    }
  } catch (_0xd92608) {
    _0x36cbbe("*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1");
    console.log(_0xd92608);
  }
});
const _0x5ed784 = {
  pattern: "subintv",
  react: '📑',
  filename: __filename
};
cmd(_0x5ed784, async (_0x4a1a37, _0x5b61e9, _0x51c9d3, {
  from: _0x201906,
  prefix: _0x53f03b,
  q: _0x5eb7b8,
  l: _0x4099eb,
  isDev: _0x59709a,
  reply: _0xc864a9
}) => {
  try {
    if (!_0x5eb7b8) {
      return await _0xc864a9("*Please Give Me Text..! 🖊️*");
    }
    const _0x3b29a3 = await fetchJson(config.API + "/api/sinhalasubs/episode?url=" + _0x5eb7b8 + "&apikey=" + config.APIKEY);
    const _0x27ccf4 = "*_☘ Title: " + _0x3b29a3.data.data.mainDetails.title + "*\n\n- *Year:* " + _0x3b29a3.data.data.mainDetails.episodeTitle + "\n- *Completeness:* " + _0x3b29a3.data.data.mainDetails.completeness + "\n- *Date:* " + _0x3b29a3.data.data.mainDetails.date + "\n\n⛏️ *Link:* " + _0x5eb7b8;
    if (config.MODE === "nonbutton") {
      const _0x20e5ba = {
        quoted: _0x51c9d3
      };
      if (_0x3b29a3.data.data.dllinks.directDownloadLinks.length < 1) {
        return await _0x4a1a37.sendMessage(_0x201906, {
          'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
        }, _0x20e5ba);
      }
      var _0x378988 = [];
      for (var _0x1c60cd = 0; _0x1c60cd < _0x3b29a3.data.data.dllinks.directDownloadLinks.length; _0x1c60cd++) {
        _0x378988.push({
          'title': _0x1c60cd + 1,
          'description': _0x3b29a3.data.data.dllinks.directDownloadLinks[_0x1c60cd].quality + " | " + _0x3b29a3.data.data.dllinks.directDownloadLinks[_0x1c60cd].size,
          'rowId': _0x53f03b + ("subdl " + _0x3b29a3.data.data.dllinks.directDownloadLinks[_0x1c60cd].link + '|' + _0x3b29a3.data.data.mainDetails.title + '|' + _0x3b29a3.data.data.imageUrls[0])
        });
      }
      const _0x2394b8 = {
        title: "_[Result from sinhalasub.]_",
        rows: _0x378988
      };
      const _0x375c82 = [_0x2394b8];
      const _0x42da5d = {
        url: _0x3b29a3.data.data.imageUrls[0]
      };
      const _0x328fb2 = {
        caption: _0x27ccf4,
        image: _0x42da5d,
        footer: config.FOOTER,
        title: "Result from sinhalasub. 📲",
        buttonText: "*🔢 Reply below number*",
        sections: _0x375c82
      };
      const _0x259b56 = {
        quoted: _0x51c9d3
      };
      return await _0x4a1a37.replyList(_0x201906, _0x328fb2, _0x259b56);
    }
    if (config.MODE === "button") {
      const _0x2bb9d7 = {
        text: "*I couldn't find anything :(*"
      };
      const _0x3d1e09 = {
        quoted: _0x51c9d3
      };
      if (_0x3b29a3.data.data.dllinks.directDownloadLinks.length < 1) {
        return await _0x4a1a37.sendMessage(_0x201906, _0x2bb9d7, _0x3d1e09);
      }
      var _0x4f6a0a = [];
      for (var _0x1c60cd = 0; _0x1c60cd < _0x3b29a3.data.data.dllinks.directDownloadLinks.length; _0x1c60cd++) {
        _0x4f6a0a.push({
          'rows': [{
            'title': _0x1c60cd + 1,
            'description': _0x3b29a3.data.data.dllinks.directDownloadLinks[_0x1c60cd].quality + " | " + _0x3b29a3.data.data.dllinks.directDownloadLinks[_0x1c60cd].size,
            'id': _0x53f03b + ("subdl " + _0x3b29a3.data.data.dllinks.directDownloadLinks[_0x1c60cd].link + '|' + _0x3b29a3.data.data.mainDetails.title + '|' + _0x3b29a3.data.data.imageUrls[0])
          }]
        });
      }
      let _0x33660b = [{
        'name': "cta_url",
        'buttonParamsJson': JSON.stringify({
          'display_text': "Join Our Channel",
          'url': "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z",
          'merchant_url': "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z"
        })
      }, {
        'name': "single_select",
        'buttonParamsJson': JSON.stringify({
          'title': "Result from cinesubz. 📲",
          'sections': _0x4f6a0a
        })
      }];
      const _0x456a8a = {
        image: _0x3b29a3.data.data.imageUrls[0],
        header: '',
        footer: config.FOOTER,
        body: _0x27ccf4
      };
      const _0x5d0b3e = {
        quoted: _0x51c9d3
      };
      return await _0x4a1a37.sendButtonMessage(_0x201906, _0x33660b, _0x5b61e9, _0x456a8a, _0x5d0b3e);
    }
  } catch (_0x16110b) {
    _0xc864a9("*ERROR !!*");
    _0x4099eb(_0x16110b);
  }
});
const _0x53d6fa = {
  pattern: "subdl",
  react: '📥',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x53d6fa, async (_0x382055, _0x5193f5, _0x5f4d3a, {
  from: _0x3d571c,
  q: _0x34e4b4,
  isDev: _0x24e779,
  reply: _0x47a30e
}) => {
  if (!_0x34e4b4) {
    return await _0x47a30e("*Please provide a direct URL!*");
  }
  try {
    const _0x333778 = _0x34e4b4.split('|')[0];
    const _0x1bb309 = _0x34e4b4.split('|')[1] || "tdd_movie_dl_system";
    const _0xb2a736 = await fetchJson(config.API + "/api/sinhalasubs/download?url=" + _0x333778 + "&apikey=" + config.APIKEY);
    const _0x440f95 = '' + _0xb2a736.data.data.link;
    _0x47a30e("╭═════════════════❀\n│  UPLOADING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀");
    const _0x3ecb64 = {
      'document': await getBuffer(_0x440f95),
      'caption': _0x1bb309 + "\n\n" + config.FOOTER,
      'mimetype': "video/mp4",
      'fileName': _0x1bb309 + ".mp4"
    };
    await _0x382055.sendMessage(_0x3d571c, _0x3ecb64);
    const _0x52f60d = {
      text: '✅',
      key: _0x5193f5.key
    };
    const _0xd1503f = {
      react: _0x52f60d
    };
    await _0x382055.sendMessage(_0x3d571c, _0xd1503f);
  } catch (_0x40aa09) {
    console.error("Error fetching or sending", _0x40aa09);
    const _0x12e264 = {
      quoted: _0x5193f5
    };
    await _0x382055.sendMessage(_0x3d571c, "*Error fetching or sending *", _0x12e264);
  }
});
const _0x47a19e = {
  pattern: "ytsmx",
  react: '📑',
  category: "movie",
  desc: "ytsmx moive downloader",
  filename: __filename
};
cmd(_0x47a19e, async (_0xfbe9bf, _0x54d83a, _0x20921f, {
  from: _0x1f92ae,
  prefix: _0x1688da,
  q: _0x1796db,
  l: _0x1a7228,
  isDev: _0x4c1e10,
  reply: _0x507113
}) => {
  try {
    if (!_0x1796db) {
      return await _0x507113("*Please Give Me Text..! 🖊️*");
    }
    const _0x4ad81c = await fetchJson(config.API + "/api/ytsmx/search?q=" + _0x1796db + "&apikey=" + config.APIKEY);
    const _0x5a04c8 = {
      quoted: _0x20921f
    };
    if (_0x4ad81c.data.data.data.length < 1) {
      return await _0xfbe9bf.sendMessage(_0x1f92ae, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x5a04c8);
    }
    var _0x47fb24 = [];
    for (var _0x21e767 = 0; _0x21e767 < _0x4ad81c.data.data.data.length; _0x21e767++) {
      _0x47fb24.push({
        'title': _0x21e767 + 1,
        'description': _0x4ad81c.data.data.data[_0x21e767].title + " | " + _0x4ad81c.data.data.data[_0x21e767].rating + " | " + _0x4ad81c.data.data.data[_0x21e767].year,
        'rowId': _0x1688da + "ytmx " + _0x4ad81c.data.data.data[_0x21e767].link
      });
    }
    const _0x2ae75a = {
      title: "_[Result from ytsmx.]_",
      rows: _0x47fb24
    };
    const _0x341022 = [_0x2ae75a];
    const _0x59ede6 = {
      text: '',
      footer: config.FOOTER,
      title: "Result from ytsmx. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x341022
    };
    const _0x4df2fe = {
      quoted: _0x20921f
    };
    return await _0xfbe9bf.replyList(_0x1f92ae, _0x59ede6, _0x4df2fe);
  } catch (_0x5e3b4b) {
    _0x507113("*ERROR !!*");
    _0x1a7228(_0x5e3b4b);
  }
});
const _0x35663c = {
  pattern: "ytmx",
  react: '📑',
  filename: __filename
};
cmd(_0x35663c, async (_0x3dd0e4, _0x2a8db3, _0x3cfdb4, {
  from: _0x5ad2dd,
  prefix: _0x34b310,
  q: _0x4a18d2,
  l: _0x4a6449,
  isDev: _0x170e85,
  reply: _0x284cb1
}) => {
  try {
    if (!_0x4a18d2) {
      return await _0x284cb1("*Please Give Me Text..! 🖊️*");
    }
    const _0x7805c7 = await fetchJson(config.API + "/api/ytsmx/movie?url=" + _0x4a18d2 + "&apikey=" + config.APIKEY);
    const _0x435d83 = "*_☘ Title: " + _0x7805c7.data.data.moviedata.title + "*\n\n- *Year:* " + _0x7805c7.data.data.moviedata.year + "\n- *Language:* " + _0x7805c7.data.data.moviedata.language + "\n- *Enter:* " + _0x7805c7.data.data.moviedata.enter + "\n\n⛏️ *Link:* " + _0x4a18d2;
    const _0x50c59a = {
      quoted: _0x3cfdb4
    };
    if (_0x7805c7.data.data.moviedata.dllinks.length < 1) {
      return await _0x3dd0e4.sendMessage(_0x5ad2dd, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x50c59a);
    }
    var _0x5bd52d = [];
    for (var _0x493667 = 0; _0x493667 < _0x7805c7.data.data.moviedata.dllinks.length; _0x493667++) {
      _0x5bd52d.push({
        'title': _0x493667 + 1,
        'description': _0x7805c7.data.data.moviedata.dllinks[_0x493667].quality + " | " + _0x7805c7.data.data.moviedata.dllinks[_0x493667].type + " | " + _0x7805c7.data.data.moviedata.dllinks[_0x493667].size,
        'rowId': _0x34b310 + "ytsmxdl " + _0x7805c7.data.data.moviedata.dllinks[_0x493667].magnet
      });
    }
    const _0x27cf47 = {
      title: "_[Result from ytsmx.]_",
      rows: _0x5bd52d
    };
    const _0x3bfe12 = [_0x27cf47, {
      'title': "*🎬 MOVIE DETAILS 🎬*",
      'rows': [{
        'title': "    1.1",
        'rowId': _0x34b310 + ("ytsmxs " + _0x4a18d2),
        'description': "Send Movie IMAGES 🏞️"
      }]
    }];
    const _0x28a8b0 = {
      caption: _0x435d83,
      image: _0x7805c7.data.data.moviedata.image,
      footer: config.FOOTER,
      title: "Result from ytsmx. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x3bfe12
    };
    const _0x1d4e04 = {
      quoted: _0x3cfdb4
    };
    return await _0x3dd0e4.replyList(_0x5ad2dd, _0x28a8b0, _0x1d4e04);
  } catch (_0x38e9cb) {
    _0x284cb1("*ERROR !!*");
    _0x4a6449(_0x38e9cb);
  }
});
const _0xd13ab6 = {
  pattern: "ytsmxs",
  react: '⬆',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0xd13ab6, async (_0xf705f2, _0x4c2d54, _0x4255a1, {
  reply: _0x9afccc,
  isDev: _0x152d69,
  from: _0xdeec44,
  q: _0x377356,
  prefix: _0x53be8f
}) => {
  try {
    if (!_0x377356) {
      return await _0x9afccc("*Please Give Me Link..! 🖊️*");
    }
    const _0x31245f = await fetchJson(config.API + "/api/ytsmx/movie?url=" + _0x377356 + "&apikey=" + config.APIKEY);
    const _0x5c68b1 = "*_☘ Title: " + _0x31245f.data.data.moviedata.title + "*\n\n- *Year:* " + _0x31245f.data.data.moviedata.year + "\n- *Language:* " + _0x31245f.data.data.moviedata.language + "\n- *Enter:* " + _0x31245f.data.data.moviedata.enter + "\n\n*⛏️ Link:* " + _0x377356 + "\n\n" + config.FOOTER;
    const _0x3c2fe9 = {
      url: _0x31245f.data.data.moviedata.image
    };
    const _0xd80f06 = {
      image: _0x3c2fe9,
      caption: _0x5c68b1
    };
    const _0x4cde00 = {
      quoted: _0x4c2d54
    };
    return await _0xf705f2.sendMessage(_0xdeec44, _0xd80f06, _0x4cde00);
    const _0x2c1d2b = {
      text: '✅',
      key: _0x4c2d54.key
    };
    const _0x3f39df = {
      react: _0x2c1d2b
    };
    await _0xf705f2.sendMessage(_0xdeec44, _0x3f39df);
  } catch (_0x4c1559) {
    _0x9afccc("*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1");
    console.log(_0x4c1559);
  }
});
const _0x485c56 = {
  pattern: "ytsmxdl",
  react: '⬆'
};
function _0xe29828(_0x321f6b, _0x4bc642, _0x3e1fc7, _0x1c2cfb, _0x3e1f91) {
  return _0xb8b3(_0x3e1fc7 + 0x76, _0x3e1f91);
}
_0x485c56.dontAddCommandList = true;
_0x485c56.filename = __filename;
cmd(_0x485c56, async (_0x3a608d, _0x2b92fe, _0x2be8be, {
  from: _0x38ef59,
  l: _0xaab4c6,
  prefix: _0x2d3ee2,
  quoted: _0x56c675,
  body: _0x568fa9,
  isDev: _0x350e6b,
  isCmd: _0x2f1640,
  command: _0x1800c9,
  args: _0x25e9d1,
  q: _0x172247,
  isGroup: _0x2891f2,
  sender: _0x259073,
  senderNumber: _0x288c3a,
  botNumber2: _0x3d096b,
  botNumber: _0x1dc67d,
  pushname: _0x19f27c,
  isMe: _0x3ba752,
  isOwner: _0x535129,
  groupMetadata: _0x25c5f8,
  groupName: _0xd65ec8,
  participants: _0x2cca63,
  groupAdmins: _0x1aafc9,
  isBotAdmins: _0x8f0c4,
  isAdmins: _0x2bddfe,
  reply: _0x2ef838
}) => {
  try {
    var _0x38b2d2 = require("seedr");
    var _0x4ec309 = new _0x38b2d2();
    await _0x4ec309.login("vajirarathnayaka891@gmail.com", "vajirarathnayaka891@");
    const _0x2b3366 = await _0x4ec309.addMagnet(_0x172247);
    _0x2ef838("╭═════════════════❀\n│  UPLODING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀");
    if (_0x2b3366.code === 400 || _0x2b3366.result !== true) {
      console.log("Error adding magnet " + JSON.stringify(_0x2b3366, null, 2));
      return null;
    }
    var _0x50009a = [];
    do {
      _0x50009a = await _0x4ec309.getVideos();
    } while (_0x50009a.length === 0);
    var _0x3b1c86 = await _0x4ec309.getFile(_0x50009a[0][0].id);
    var _0x13380c = _0x50009a[0][0].fid;
    const _0x9a4dcf = _0x3b1c86.url;
    const _0x346450 = {
      'document': await getBuffer(_0x9a4dcf),
      'caption': _0x3b1c86.name + "\n\n" + config.FOOTER,
      'mimetype': "video/mp4",
      'fileName': _0x3b1c86.name + ".mp4"
    };
    await _0x3a608d.sendMessage(_0x38ef59, _0x346450);
    await _0x4ec309.deleteFolder(_0x13380c);
    const _0x57017d = {
      text: "Movie send " + config.JID + " Successfull ✔"
    };
    const _0x204561 = {
      quoted: _0x2b92fe
    };
    await _0x3a608d.sendMessage(_0x38ef59, _0x57017d, _0x204561);
  } catch (_0xc9695a) {
    const _0x5c955c = {
      text: '❌',
      key: _0x2b92fe.key
    };
    const _0x5851bb = {
      react: _0x5c955c
    };
    await _0x3a608d.sendMessage(_0x38ef59, _0x5851bb);
    console.log(_0xc9695a);
    _0x2ef838("❌ *Error Accurated !!*\n\n" + _0xc9695a);
  }
});
const _0x21551a = {};
function _0x39959d(_0x209bb6, _0x2b9390, _0x223bb6, _0x2e8b9e, _0x40a93f) {
  return _0xb8b3(_0x2e8b9e - 0x303, _0x2b9390);
}
_0x21551a.pattern = "zoom";
_0x21551a.react = '📑';
_0x21551a.category = "movie";
_0x21551a.desc = "zoom moive downloader";
_0x21551a.filename = __filename;
cmd(_0x21551a, async (_0x45faa1, _0x58aefb, _0x3a9072, {
  from: _0x8db9c2,
  prefix: _0x190498,
  q: _0x192702,
  l: _0x21c889,
  isDev: _0x3bfac2,
  reply: _0x3094ae
}) => {
  try {
    if (!_0x192702) {
      return await _0x3094ae("*Please Give Me Text..! 🖊️*");
    }
    const _0x21a771 = "https://zoom.lk/?s=" + _0x192702;
    const _0x1b1c50 = await axios.get(_0x21a771);
    const _0x31a80f = cheerio.load(_0x1b1c50.data);
    let _0x18b561 = [];
    _0x31a80f("div.td-pb-span8.td-main-content > div > div.td_module_16.td_module_wrap.td-animation-stack").each((_0x544cf4, _0x135de8) => {
      _0x18b561.push({
        'time': _0x31a80f(_0x135de8).find("div.item-details > div > span > time").text(),
        'title': _0x31a80f(_0x135de8).find("div.item-details > h3 > a").text(),
        'author': _0x31a80f(_0x135de8).find("div.item-details > div > span > a").text(),
        'desc': _0x31a80f(_0x135de8).find("div.item-details > div.td-excerpt").text(),
        'comments': _0x31a80f(_0x135de8).find("div.item-details > div > span.td-module-comments a").text(),
        'image': _0x31a80f(_0x135de8).find("div.td-module-thumb > img").attr("src"),
        'link': _0x31a80f(_0x135de8).find("div.item-details > h3 > a").attr("href")
      });
    });
    const _0x3e7485 = {
      quoted: _0x3a9072
    };
    if (_0x18b561.length < 1) {
      return await _0x45faa1.sendMessage(_0x8db9c2, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x3e7485);
    }
    var _0x5da5cd = [];
    for (var _0x47bbb8 = 0; _0x47bbb8 < _0x18b561.length; _0x47bbb8++) {
      _0x5da5cd.push({
        'title': _0x47bbb8 + 1,
        'description': _0x18b561[_0x47bbb8].title + '+' + _0x18b561[_0x47bbb8].time,
        'rowId': _0x190498 + "zoomdl " + _0x18b561[_0x47bbb8].link
      });
    }
    const _0x572027 = {
      title: "_[Result from zoom.]_",
      rows: _0x5da5cd
    };
    const _0x1e39bc = [_0x572027];
    const _0x4196e4 = {
      url: config.LOGO
    };
    const _0x38c26c = {
      caption: "🎬 VAJIRA MD MOVIE-DL 🎬\n\n   ⏳ Search A Movie Name: " + _0x192702 + "\n📲 Search top 10 Movies\n",
      image: _0x4196e4,
      footer: "MOVIE DOWNLOADER BY VAJIRA MD",
      title: "Result from zoom. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x1e39bc
    };
    const _0x2ef6b7 = {
      quoted: _0x3a9072
    };
    return await _0x45faa1.replyList(_0x8db9c2, _0x38c26c, _0x2ef6b7);
  } catch (_0xa8aa58) {
    _0x3094ae("*ERROR !!*");
    _0x21c889(_0xa8aa58);
  }
});
const _0x317701 = {
  pattern: "zoomdl",
  react: '📑',
  category: '',
  desc: "pirate moive downloader",
  filename: __filename
};
cmd(_0x317701, async (_0x1bd00a, _0x464616, _0x5c86c6, {
  from: _0x317149,
  prefix: _0x29b4c1,
  q: _0x131b54,
  l: _0x3e7e54,
  isDev: _0x2a2e49,
  reply: _0x5c418f
}) => {
  try {
    if (!_0x131b54) {
      return await _0x5c418f("*Please Give Me Text..! 🖊️*");
    }
    const _0x33215c = await axios.get(_0x131b54);
    const _0x177d5b = cheerio.load(_0x33215c.data);
    const _0x3d9380 = _0x177d5b("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_title.tdi_60.tdb-single-title.td-pb-border-top.td_block_template_17 > div > h1").text();
    const _0x36de07 = _0x177d5b("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_67.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > span").text();
    const _0x27d110 = _0x177d5b("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_70.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > time").text();
    const _0x567030 = _0x177d5b("#tdi_81 > div > div.vc_column.tdi_84.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_single_content.tdi_86.td-pb-border-top.td_block_template_17.td-post-content.tagdiv-type > div > p > a > small").text();
    const _0x28e793 = _0x177d5b("div.tdb-block-inner.td-fix-index > p > a").attr("href");
    const _0x1f4405 = "📃 *Title:* " + _0x3d9380 + "\n\n🔗 *Link:* " + _0x28e793 + "\n\n📅 *Year:* " + _0x27d110 + "\n\n💫 *Size:* " + _0x567030 + "\n\n⏳ *Views:* " + _0x36de07 + "\n";
    const _0x21e689 = [{
      'title': "*🎬 SUB-SEARCH-SITE 🎬*",
      'rows': [{
        'title': "    1.1",
        'rowId': _0x29b4c1 + ("zip " + _0x28e793 + '|' + _0x3d9380),
        'description': "Download in " + _0x567030
      }]
    }];
    const _0x2e1403 = {
      text: _0x1f4405,
      footer: "MOVIE DOWNLOADER BY VAJIRA MD",
      title: "Search By zoom",
      buttonText: "*🔢 Reply below number*",
      sections: _0x21e689
    };
    const _0x3f9463 = {
      quoted: _0x5c86c6
    };
    return await _0x1bd00a.replyList(_0x317149, _0x2e1403, _0x3f9463);
  } catch (_0x5787c4) {
    _0x5c418f("*ERROR !!*");
    _0x3e7e54(_0x5787c4);
  }
});
const _0x2cacdb = {
  pattern: "subz",
  react: '📑',
  category: "movie",
  desc: "subz moive downloader",
  filename: __filename
};
cmd(_0x2cacdb, async (_0x6a0f43, _0x554230, _0x30baa2, {
  from: _0x21bd62,
  prefix: _0x5ab747,
  q: _0x3460c5,
  l: _0x11b258,
  isDev: _0x150133,
  reply: _0x5058fb
}) => {
  try {
    if (!_0x3460c5) {
      return await _0x5058fb("*Please Give Me Text..! 🖊️*");
    }
    var _0x5edc33 = "https://subz.lk/?s=" + _0x3460c5;
    var _0x818efb = await axios.get(_0x5edc33);
    var _0x14712e = cheerio.load(_0x818efb.data);
    const _0x4986f9 = [];
    _0x14712e("div.col-lg-3.col-md-6.col-sm-12").each((_0x272c32, _0x4201d7) => {
      _0x4986f9.push({
        'title': _0x14712e(_0x4201d7).find("a.font-bold.text-wrap.text-break.text-justify").text(),
        'link': _0x14712e(_0x4201d7).find('a').attr("href"),
        'image': _0x14712e(_0x4201d7).find("img").attr("src"),
        'emovies': _0x14712e(_0x4201d7).find("a.text-white").attr("href")
      });
    });
    const _0x6a74d8 = {
      quoted: _0x30baa2
    };
    if (_0x4986f9.length < 1) {
      return await _0x6a0f43.sendMessage(_0x21bd62, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x6a74d8);
    }
    var _0x12bb4b = [];
    for (var _0x19aec8 = 0; _0x19aec8 < _0x4986f9.length; _0x19aec8++) {
      _0x12bb4b.push({
        'title': _0x19aec8 + 1,
        'description': _0x4986f9[_0x19aec8].title + '+' + _0x4986f9[_0x19aec8].emovies,
        'rowId': _0x5ab747 + "subzdl " + _0x4986f9[_0x19aec8].link
      });
    }
    const _0x1c474b = {
      title: "_[Result from subz.]_",
      rows: _0x12bb4b
    };
    const _0x494d98 = [_0x1c474b];
    const _0x4c32d0 = {
      url: config.LOGO
    };
    const _0x2e2952 = {
      caption: "⏳ Search A SubsTitle Name: " + _0x3460c5 + "\n📲 Search top 10 SubsTitles\n",
      image: _0x4c32d0,
      footer: "MOVIE DOWNLOADER BY VAJIRA MD",
      title: "Search By subz",
      buttonText: "*🔢 Reply below number*",
      sections: _0x494d98
    };
    const _0x3912b2 = {
      quoted: _0x30baa2
    };
    return await _0x6a0f43.replyList(_0x21bd62, _0x2e2952, _0x3912b2);
  } catch (_0x5d5aa6) {
    _0x5058fb("*ERROR !!*");
    _0x11b258(_0x5d5aa6);
  }
});
const _0x4341a6 = {
  pattern: "subzdl",
  react: '📑'
};
function _0x3dda67(_0x87c149, _0x2f4b66, _0x183c44, _0x2a572c, _0x441c4e) {
  return _0xb8b3(_0x2f4b66 + 0x2ee, _0x2a572c);
}
_0x4341a6.category = '';
_0x4341a6.desc = "pirate moive downloader";
_0x4341a6.filename = __filename;
cmd(_0x4341a6, async (_0x587de8, _0x3e2f07, _0x413662, {
  from: _0xd93977,
  prefix: _0x1f8734,
  q: _0x4d91e6,
  l: _0xa23cff,
  isDev: _0x438656,
  reply: _0x247af3
}) => {
  try {
    if (!_0x4d91e6) {
      return await _0x247af3("*Please Give Me Text..! 🖊️*");
    }
    var _0x48d1c2 = await axios.get(_0x4d91e6);
    var _0x3c7a13 = cheerio.load(_0x48d1c2.data);
    const _0x48ce48 = _0x3c7a13("h1.text-center.text-danger.h4").text();
    const _0x67f2a3 = _0x3c7a13("time").text().trim();
    const _0x4be3a6 = _0x3c7a13("a.btn.btn-outline-success.fw-bold").attr("href");
    const _0x5e3f4c = _0x3c7a13("li.list-group-item").text().trim();
    const _0x523636 = "📃 *Title:* " + _0x48ce48 + "\n\n📅 *Year:* " + _0x67f2a3 + "\n\n💫 *Size:* " + _0x5e3f4c + "\n";
    const _0x5e6170 = [{
      'title': "*🎬 SUB-SEARCH-SITE 🎬*",
      'rows': [{
        'title': "    1.1",
        'rowId': _0x1f8734 + ("zip " + _0x4be3a6 + '|' + _0x48ce48),
        'description': "Download Substitles"
      }]
    }];
    const _0x32b024 = {
      url: config.LOGO
    };
    const _0x4eba25 = {
      caption: _0x523636,
      image: _0x32b024,
      footer: "MOVIE DOWNLOADER BY VAJIRA MD",
      title: "Search By subz",
      buttonText: "*🔢 Reply below number*",
      sections: _0x5e6170
    };
    const _0x1ccc92 = {
      quoted: _0x413662
    };
    return await _0x587de8.replyList(_0xd93977, _0x4eba25, _0x1ccc92);
  } catch (_0x154d53) {
    _0x247af3("*ERROR !!*");
    _0xa23cff(_0x154d53);
  }
});
const _0x584e = {
  pattern: "s-subtitle",
  react: '📑',
  category: "movie",
  desc: "s-subtitle moive downloader",
  filename: __filename
};
cmd(_0x584e, async (_0x3ac057, _0x3bb741, _0x463906, {
  from: _0xd558e2,
  prefix: _0x42e10e,
  q: _0x5b774d,
  l: _0x13683e,
  isDev: _0x5c0fa5,
  reply: _0x10c5b1
}) => {
  try {
    if (!_0x5b774d) {
      return await _0x10c5b1("*Please Give Me Text..! 🖊️*");
    }
    const _0x434da7 = "https://sinhala-subtitles.com/?s=" + _0x5b774d;
    const _0x4f24b1 = await axios.get(_0x434da7);
    var _0x1fa260 = cheerio.load(_0x4f24b1.data);
    const _0xa2065b = [];
    _0x1fa260("article.l-post.grid-base-post.grid-post").each((_0x2697f7, _0x4cdcb7) => {
      _0xa2065b.push({
        'link': _0x1fa260(_0x4cdcb7).find('a').attr("href"),
        'image': _0x1fa260(_0x4cdcb7).find("span").attr("data-bgsrc"),
        'title': _0x1fa260(_0x4cdcb7).find('a').attr("title"),
        'date': _0x1fa260(_0x4cdcb7).find("time.post-date").text(),
        'desc': _0x1fa260(_0x4cdcb7).find('p').text()
      });
    });
    const _0x216042 = {
      quoted: _0x463906
    };
    if (_0xa2065b.length < 1) {
      return await _0x3ac057.sendMessage(_0xd558e2, {
        'text': "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
      }, _0x216042);
    }
    var _0x520d29 = [];
    for (var _0x3fcc45 = 0; _0x3fcc45 < _0xa2065b.length; _0x3fcc45++) {
      _0x520d29.push({
        'title': _0x3fcc45 + 1,
        'description': _0xa2065b[_0x3fcc45].title + '||' + _0xa2065b[_0x3fcc45].date,
        'rowId': _0x42e10e + "ssdl " + _0xa2065b[_0x3fcc45].link
      });
    }
    const _0x4da8fa = {
      title: "_[Result from sinhala-subtitles.]_",
      rows: _0x520d29
    };
    const _0x6a52bf = [_0x4da8fa];
    const _0x10b990 = {
      url: config.LOGO
    };
    const _0x200521 = {
      caption: "🎬 VAJIRA MD MOVIE-DL 🎬\n\n   ⏳ Search A Movie Name: " + _0x5b774d + "\n📲 Search top 10 Movies\n",
      image: _0x10b990,
      footer: "MOVIE DOWNLOADER BY VAJIRA MD",
      title: "Result from sinhala-subtitles. 📲",
      buttonText: "*🔢 Reply below number*",
      sections: _0x6a52bf
    };
    const _0x2e0bc5 = {
      quoted: _0x463906
    };
    return await _0x3ac057.replyList(_0xd558e2, _0x200521, _0x2e0bc5);
  } catch (_0x1eb0c7) {
    _0x10c5b1("*ERROR !!*");
    _0x13683e(_0x1eb0c7);
  }
});
const _0x391260 = {
  pattern: "ssdl",
  react: '📑',
  category: '',
  desc: "pirate moive downloader",
  filename: __filename
};
cmd(_0x391260, async (_0x5d73ed, _0x4cca72, _0x4872e7, {
  from: _0x4e583e,
  prefix: _0x14cd5c,
  q: _0x5c579e,
  l: _0x3b0083,
  isDev: _0x223671,
  reply: _0x35b52d
}) => {
  try {
    if (!_0x5c579e) {
      return await _0x35b52d("*Please Give Me Text..! 🖊️*");
    }
    const _0x61467e = await axios.get(_0x5c579e);
    const _0x3cbe81 = cheerio.load(_0x61467e.data);
    const _0x50c78b = _0x3cbe81("h1.is-title.post-title").text();
    const _0x4f18c6 = _0x3cbe81("span.meta-item.date > time.post-date").text();
    const _0x3ea78a = _0x3cbe81("a.image-link.media-ratio.ar-bunyad-main").attr("href");
    const _0x46622e = _0x3cbe81('p').text();
    const _0x538940 = _0x3cbe81("figure > a").attr("href");
    const _0x33da15 = "📃 *Title:* " + _0x50c78b + "\n\n🔗 *Link:* " + _0x538940 + "\n\n📅 *Year:* " + _0x4f18c6 + "\n\n⏳ *Views:* " + _0x46622e + "\n";
    const _0x1c5c0b = [{
      'title': "*🎬 MOVIE-SEARCH-SITE 🎬*",
      'rows': [{
        'title': "    1.1",
        'rowId': _0x14cd5c + ("zip " + _0x538940 + '|' + _0x50c78b),
        'description': "Download in sinhala-subtitles"
      }]
    }];
    const _0x18ca60 = {
      url: _0x3ea78a
    };
    const _0x165074 = {
      caption: _0x33da15,
      image: _0x18ca60,
      footer: "MOVIE DOWNLOADER BY VAJIR MD",
      title: "Search By sinhala-subtitles",
      buttonText: "*🔢 Reply below number*",
      sections: _0x1c5c0b
    };
    const _0x312ded = {
      quoted: _0x4872e7
    };
    return await _0x5d73ed.replyList(_0x4e583e, _0x165074, _0x312ded);
  } catch (_0x340778) {
    _0x35b52d("*ERROR !!*");
    _0x3b0083(_0x340778);
  }
});
const _0x3961b4 = {
  pattern: "mp4",
  react: '📥',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x3961b4, async (_0x5284e7, _0x3d45cf, _0x5c8925, {
  from: _0x514072,
  q: _0x9162,
  isDev: _0x1dd94d,
  reply: _0x5ab4e6
}) => {
  if (!_0x9162) {
    return await _0x5ab4e6("*Please provide a direct URL!*");
  }
  try {
    const _0xa440a0 = _0x9162.split('|')[0];
    const _0x227771 = _0x9162.split('|')[1] || "tc_movie_dl_system";
    const _0x1c950f = await axios.get(_0xa440a0);
    const _0xd2f034 = cheerio.load(_0x1c950f.data);
    const _0x1f6601 = _0xd2f034("#link").attr("href");
    const _0x9f99b7 = _0x1f6601.replace(/u/g, "api/file");
    console.log(_0x9f99b7);
    var _0x509085 = ["《 █▒▒▒▒▒▒▒▒▒▒▒》10%", "《 ████▒▒▒▒▒▒▒▒》30%", "《 ███████▒▒▒▒▒》50%", "《 ██████████▒▒》80%", "《 ████████████》100%", "𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."];
    const _0x2c7d05 = {
      text: "ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ..."
    };
    let {
      key: _0x561130
    } = await _0x5284e7.sendMessage(_0x514072, _0x2c7d05);
    for (let _0x25c925 = 0; _0x25c925 < _0x509085.length; _0x25c925++) {
      const _0x5caa6a = {
        text: _0x509085[_0x25c925],
        edit: _0x561130
      };
      await _0x5284e7.sendMessage(_0x514072, _0x5caa6a);
    }
    const _0x29a2b4 = {
      'document': await getBuffer(_0x9f99b7),
      'caption': _0x227771 + "\n\n*> 🎬 VAJIRA MD TEAM MOVIEDL 🎬*",
      'mimetype': "video/mp4",
      'fileName': _0x227771 + ".mp4"
    };
    await _0x5284e7.sendMessage(_0x514072, _0x29a2b4);
    const _0x4612e5 = {
      text: '✅',
      key: _0x3d45cf.key
    };
    const _0x4f7bf9 = {
      react: _0x4612e5
    };
    await _0x5284e7.sendMessage(_0x514072, _0x4f7bf9);
  } catch (_0x53d658) {
    console.error("Error fetching or sending", _0x53d658);
    const _0x4ac480 = {
      quoted: _0x3d45cf
    };
    await _0x5284e7.sendMessage(_0x514072, "*Error fetching or sending *", _0x4ac480);
  }
});
const _0x31e1f8 = {
  pattern: "mp41",
  react: '📥',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x31e1f8, async (_0x5482ce, _0x518b6c, _0x2cc8be, {
  from: _0x4b4dc8,
  q: _0x573f38,
  isDev: _0x4f1b1c,
  reply: _0x3ed2d7
}) => {
  if (!_0x573f38) {
    return await _0x3ed2d7("*Please provide a direct URL!*");
  }
  try {
    const _0x1167b7 = _0x573f38.split('|')[0];
    const _0x3076e1 = _0x573f38.split('|')[1] || "tc_movie_dl_system";
    var _0x3578a0 = ["《 █▒▒▒▒▒▒▒▒▒▒▒》10%", "《 ████▒▒▒▒▒▒▒▒》30%", "《 ███████▒▒▒▒▒》50%", "《 ██████████▒▒》80%", "《 ████████████》100%", "𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."];
    const _0x4724f2 = {
      text: "ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ..."
    };
    let {
      key: _0x179d9f
    } = await _0x5482ce.sendMessage(_0x4b4dc8, _0x4724f2);
    for (let _0x3b2bbb = 0; _0x3b2bbb < _0x3578a0.length; _0x3b2bbb++) {
      const _0x443a40 = {
        text: _0x3578a0[_0x3b2bbb],
        edit: _0x179d9f
      };
      await _0x5482ce.sendMessage(_0x4b4dc8, _0x443a40);
    }
    const _0x384c0e = {
      'document': await getBuffer(_0x1167b7),
      'caption': _0x3076e1 + "\n\n*> 🎬 VAJIRA MD TEAM MOVIEDL 🎬*",
      'mimetype': "video/mp4",
      'fileName': _0x3076e1 + ".mp4"
    };
    await _0x5482ce.sendMessage(_0x4b4dc8, _0x384c0e);
    const _0x5096af = {
      text: '✅',
      key: _0x518b6c.key
    };
    const _0x39e3cc = {
      react: _0x5096af
    };
    await _0x5482ce.sendMessage(_0x4b4dc8, _0x39e3cc);
  } catch (_0x4f5df6) {
    console.error("Error fetching or sending", _0x4f5df6);
    const _0xb26fbb = {
      quoted: _0x518b6c
    };
    await _0x5482ce.sendMessage(_0x4b4dc8, "*Error fetching or sending *", _0xb26fbb);
  }
});
const _0x35d809 = {
  pattern: "zip",
  react: '📥',
  dontAddCommandList: true,
  filename: __filename
};
cmd(_0x35d809, async (_0x18392e, _0x5651f8, _0x11f9f9, {
  from: _0x54db15,
  q: _0x419c1d,
  isDev: _0x4cdcd4,
  reply: _0x253b44
}) => {
  if (!_0x419c1d) {
    return await _0x253b44("*Please provide a direct URL!*");
  }
  try {
    const _0x44a577 = _0x419c1d.split('|')[0];
    const _0x5e7c02 = _0x419c1d.split('|')[1] || "vajira_md_sub_dl_system";
    var _0x5ab058 = ["《 █▒▒▒▒▒▒▒▒▒▒▒》10%", "《 ████▒▒▒▒▒▒▒▒》30%", "《 ███████▒▒▒▒▒》50%", "《 ██████████▒▒》80%", "《 ████████████》100%", "𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."];
    const _0x2ae1af = {
      text: "ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ..."
    };
    let {
      key: _0x31f9d3
    } = await _0x18392e.sendMessage(_0x54db15, _0x2ae1af);
    for (let _0x2a996e = 0; _0x2a996e < _0x5ab058.length; _0x2a996e++) {
      const _0xa844b0 = {
        text: _0x5ab058[_0x2a996e],
        edit: _0x31f9d3
      };
      await _0x18392e.sendMessage(_0x54db15, _0xa844b0);
    }
    const _0x4ec461 = {
      'document': await getBuffer(_0x44a577),
      'caption': "*🎬 VAJIRA MD SUB-DL 🎬*",
      'mimetype': "VAJIRA MD SUB DL",
      'fileName': _0x5e7c02 + ".zip"
    };
    const _0x468d3b = {
      quoted: _0x5651f8
    };
    await _0x18392e.sendMessage(_0x54db15, _0x4ec461, _0x468d3b);
    const _0x4f43b8 = {
      text: '✅',
      key: _0x5651f8.key
    };
    const _0x1068af = {
      react: _0x4f43b8
    };
    await _0x18392e.sendMessage(_0x54db15, _0x1068af);
  } catch (_0x17b36f) {
    console.error("Error fetching or sending", _0x17b36f);
    const _0x1a1c0c = {
      quoted: _0x5651f8
    };
    await _0x18392e.sendMessage(_0x54db15, "*Error fetching or sending *", _0x1a1c0c);
  }
});
