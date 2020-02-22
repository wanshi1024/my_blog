<template>
  <div class="article-container">
    <div class="left">
      <div class="article-wrap">
        <div class="article-header">
          <h4 class="article-title">部署之后，访问不了（已解决）</h4>
          <p class="article-info">
            <a>顽石mua</a>
            <span class="time">最后发布于 2020-02-19 19:52:42</span>
            <span class="read-count">阅读数 1122</span>
            <span class="collection">
              <i class="el-icon-star-off"></i>
              收藏
            </span>
          </p>
        </div>
        <el-divider></el-divider>
        <article>
          <p>
            欢迎使用
            <b>wangEditor 富文本编辑器</b>，请输入内容...
          </p>
          <p>
            这到底是啥情况？
            <br />
            <br />微软开发者平台GitHub 的一个区块链项目 Handshake ，搞了一个招募新会员的活动，面向GitHub 上前 25万名开发者派送 4,246.99 HNS币,大约价值 1358.56美元。
            <br />
            <br />
          </p>
          <h3>Handshake 的官网地址：</h3>
          <span style="font-family: 微软雅黑; text-decoration-line: underline;">
            https://handshake.org/
            <br />github地址：
            <br />https://github.com/handshake-org/hs-airdrop
          </span>
          <br />
          <br />原文介绍如下：
          <br />
          <blockquote>
            The top ~250,000 users on github have had their SSH keys and PGP added to a&nbsp;merkle tree. Out of those ~250,000 users, ~175,000 of them had valid SSH and PGP keys at the time of tree creation.
            <br />If you had 15 or more followers on github during the week of&nbsp;2019-02-04, your github SSH &amp; PGP keys are included in the merkle tree.
            <br />Likewise, roughly 30,000 keys from the PGP WOT Strongset have also been included in the tree.
            <br />As a final addition, Hacker News accounts which are linked with Keybase accounts are included in the tree provided they were ~1.5 years old during the crawl.
            <br />This merkle tree is computed and its root is added to consensus rules of the Handshake blockchain, allowing the owner of a key to publish a signed merkle proof on-chain in order to redeem their airdrop.
            <br />With the final mainnet key list, every open source developer will receive&nbsp;4,246.994314&nbsp;HNS coins from the airdrop.&nbsp;&nbsp;
            <img
              src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png"
              alt="[坏笑]"
            />
          </blockquote>
        </article>
        <el-divider></el-divider>
        <div class="labels">
          <ArticleLabel />
          <ArticleLabel />
          <ArticleLabel />
        </div>
        <el-divider></el-divider>
        <div class="reply">
          <p v-if="false">没有登录</p>
          <div v-else class="reply-wrap">
            <el-input type="textarea"></el-input>
            <p>
              <span>还能输入1000个字符</span>
              <el-button type="primary" size="small" class="reply-btn">发表评论</el-button>
            </p>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="comment">
          <Comment />
        </div>
      </div>
    </div>
    <div class="right">
       <ZZWX />
      <HotLabel />
      <RelatedArticle />
    </div>
  </div>
</template>

<script>
import ArticleLabel from "@/components/article/ArticleLabel";
import Comment from "@/components/article/Comment";
import ZZWX from "@/components/ZZWX";
import HotLabel from "@/components/HotLabel";
import RelatedArticle from '@/components/article/RelatedArticle'
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    ArticleLabel,
    Comment,
    ZZWX,
    HotLabel,
    RelatedArticle
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>

<style lang="less" scoped>
.article-container {
  display: flex;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  height: 100%;
  background: white;
  padding-top: 20px;
  .left {
    width: 68%;
    background: skyblue;
    .article-wrap {
      padding: 0 24px 16px;
      background: #fff;
      margin-bottom: 8px;
      .article-header {
        .article-title {
          font-size: 24px;
          word-wrap: break-word;
          color: rgb(112, 110, 110);
        }
        .article-info {
          color: #858585;
          width: 88%;
          line-height: 26px;
          margin-top: 8px;
          & > * {
            margin-right: 20px;
          }
          a {
            color: #78a5f1;
            cursor: pointer;
            &:hover {
              text-decoration-line: underline;
            }
          }
          .collection {
            color: #ff700a;
            cursor: pointer;
          }
        }
      }
      .reply {
        .reply-wrap {
          p {
            margin-top: 8px;
            display: flex;
            justify-content: flex-end;
            span {
              font-size: 12px;
              color: #999;
              line-height: 40px;
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
  .right {
    width: 24%;
    margin-right: 10%;
    // background: pink;
  }
  @media only screen and (max-width: 1000px) {
    .left {
      width: 100%;
    }
    .right {
      display: none;
    }
  }
}
</style>