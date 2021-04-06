<template>
  <div>
    <header class="b-header">
      <div class="b-header__wrapper container">
        <h1 class="b-header__title">Zitat</h1>

        <div class="b-header__search">
          <input class="b-header__search-input" v-model="zitat" />
          <button class="b-header__search-button" @click="search()">
            Search
          </button>
        </div>
      </div>
    </header>

    <div class="b-main container">
      <div class="b-main__list">
        <table
          class="b-main__list-element"
          v-for="result of resultList"
          :key="result.legacy_pk"
        >
          <tr>
            <th>
              <router-link
                class="b-main__list-link"
                :to="'/details-page/' + result.legacy_pk"
                >{{ result.display_label }}</router-link
              >
            </th>
          </tr>
          <tr>
            <td>
              <p class="b-main__list-summary">{{ result.summary }}</p>
            </td>
          </tr>
          <tr>
            <td>
              <span class="b-main__list-author">{{ result.autorName }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Start date: {{ result.text.start_date }}</span>
              <br />
              <span>End date: {{ result.text.end_date }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      zitat: "",
      resultList: [],
    };
  },
  methods: {
    async search() {
      const response = await axios.get(
        "https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?zitat=" + this.zitat
      );

      const results =
        response.status === 200 ? response.data.results.slice(0, 20) : [];

      await this.getAutors(results);
      this.resultList = results;
    },
    async getAutors(results) {
      for (let result of results) {
        if (
          result &&
          result.text &&
          result.text.autor &&
          result.text.autor.length
        ) {
          let autors = "";

          for (const element of result.text.autor) {
            const response = await this.fetchAutor(element);
            autors = autors + response.name;
          }

          result.autorName = autors;
        }
      }
    },
    async fetchAutor(url) {
      const response = await axios.get(url);
      return response.status === 200 ? response.data : {};
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.b-header {
  border-bottom: 1px solid #EBEBEB;
  padding: 30px 15px;

  @media (min-width: 1200px) {
    padding: 40px 0;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__title {
    color: #0c0470;
    margin: 0 0 20px 0;

    @media (min-width: 768px) {
      margin: 0 60px 0 0;
    }
  }

  &__search {
    &-input {
      border: 1px solid #EBEBEB;
      border-radius: 8px;
      box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      outline: none;
      font-size: 16px;
      padding: 8px 10px;
      margin-bottom: 10px;
      transition: 0.18s ease-out;
      width: 100%;

      &:focus {
        border: 1px solid #B8B6B6;
        box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.01),
          0px 0px 8px rgba(0, 0, 0, 0.2);
      }

      &:hover {
        box-shadow: inset 1px 2px 8px rgba(0, 0, 0, 0.02);
      }

      @media (min-width: 375px) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-bottom: 0;
        width: auto;
      }
    }

    &-button {
      background-color: white;
      border: 1px solid #EBEBEB;
      border-radius: 8px;
      font-size: 16px;
      padding: 8px 10px;
      cursor: pointer;
      outline: none;
      width: 100%;

      &:hover {
        border: 1px solid #B8B6B6;
      }

      @media (min-width: 375px) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        width: auto;
      }
    }
  }
}

.b-main {
  &__list {
    margin-top: 50px;
    padding: 0 15px 30px;

    @media (min-width: 768px) {
      padding: 0 30px 30px;
    }

    @media (min-width: 1200px) {
      padding: 0 0 30px 0;
    }

    &-element {
      margin-bottom: 50px;
      text-align: left;
    }

    &-link {
      display: block;
      font-size: 20px;
      width: 100%;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      @media (min-width: 768px) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 500px;
      }

      @media (min-width: 992px) {
        max-width: 700px;
      }
    }

    &-summary {
      margin-top: 6px;
      color: #70757a;
      width: 100%;

      @media (min-width: 992px) {
        max-width: 850px;
      }
    }

    &-author {
      display: block;
      color: #0c0470;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
}
</style>
