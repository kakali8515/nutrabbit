import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../components/NotFound.vue";
import Login from "../pages/Common/login.vue";
import NaverLoginCallback from "../pages/Common/NaverLoginCallback.vue";
import KakaoLoginCallback from "../pages/Common/kakaoLoginCallback.vue";
import PaymentCallback from "../pages/Common/PaymentCallback.vue";
import MemberRegistrationTypeSelection from "../pages/Common/MemberRegistrationTypeSelection.vue";
import MemberRegistrationMethod from "../pages/Common/MemberRegistrationMethod.vue";
import MemberRegistrationIndividuals from "../pages/Common/MemberRegistrationIndividual.vue";
import MembershipRegistrationBusiness from "../pages/Common/MembershipRegistrationBusiness.vue";
import RegistrationCompleted from "../pages/Common/MemberRegistrationCompleted.vue";
import FindID from "../pages/Common/FindId.vue";
import ForgotPassword from "../pages/Common/ForgotPassword.vue";
import ChangePassword from "../pages/Common/ChangePassword.vue";
import SearchResult from "../pages/GNB/SearchResult.vue";
import PersonalInformation from "../pages/Personalinfo/PersonalInformationManagement.vue";
import PersonalInformationBusiness from "../pages/Personalinfo/PersonalInformationBusiness.vue";
import WithdrawalOfMembership from "../pages/Personalinfo/WithdrawalOfMembership.vue";
import Main from "../pages/Main/Main.vue";
import MyChoice from "../pages/MyChoice/MyChoice.vue";
import MyChoiceCategorySelection from "../pages/MyChoice/MyChoiceCategorySelection.vue";
import InquiryContactUs from "../pages/CustomerCenter/InquiryContactUs.vue";
import MyChoiceRecomandedBlending from "../pages/MyChoice/MyChoiceRecomandedBlending.vue";
import SampleMaking from "../pages/SampleMaking.vue";
import ChoiceRecommendedBlendingDetailedPage from "../pages/MyChoice/ChoiceRecommendedBlendingDetailedPage.vue";
import ChoiceRecommendedBlendingPackageSelection from "../pages/MyChoice/ChoiceRecommendedBlendingPackageSelection.vue";
import Notice from "../pages/CustomerCenter/Notice.vue";
import NoticeDetailPage from "../pages/CustomerCenter/NoticeDetailPage.vue";
import FAQ from "../pages/CustomerCenter/FAQ.vue";
import RawMaterialEstimation from "../pages/MyChoice/RawMaterialEstimation.vue";
import RawMaterialPackage from "../pages/MyChoice/RawMaterialPackage.vue";
import IngredientFormulation from "../pages/MyChoice/IngredientFormulation.vue";
import AddIngredient from "../pages/MyChoice/AddIngredient.vue";
import MyChoiceRecomandedBlendingFinalQuote from "../pages/MyChoice/MyChoiceRecomandedBlendingFinalQuote.vue";
import MyChoiceRawMaterialDetailedPage from "../pages/MyChoice/MyChoiceRawMaterialDetailedPage.vue";
import Inquery from "../pages/CustomerCenter/Inquery.vue";
import MyRecipeDetails from "../pages/OnlyMe/MyRecipeDetails.vue";
import MyRecipeDetailsEdit from "../pages/OnlyMe/MyRecipeDetailsEdit.vue";
import MyApplicationDetails from "../pages/OnlyMe/MyApplicationDetails.vue";
import MyRecipeDetailsSample from "../pages/OnlyMe/MyRecipeDetailsSample.vue";
import MyRecipeDetailsChoice from "../pages/OnlyMe/MyRecipeDetailsChoice.vue";
import MyRecipe from "../pages/OnlyMe/MyRecipe.vue";
import AboutUs from "../pages/AboutUs.vue";
import ServiceIntro from "../pages/Nutri/ServiceIntro.vue";
import NutriDetail from "../pages/Nutri/NutriDetail.vue";
import Terms from "../pages/terms.vue";
import Privacy from "../pages/privacy.vue";
import NutriFinalEstimation from "../pages/Nutri/NutriFinalEstimation.vue";
// import Toast from "../alert/alert.js";
import SliderTest from "../pages/SliderTest.vue";

import MyRecipeDetail from "../pages/MyRecipeDetail.vue";
function guest(to, from, next) {
  if (localStorage.token) {
    next({ name: "Main" });
    Toast.fire({ title: "You already logged in" });
  } else next();
}

function guard(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next({ name: "Login" });
    Toast.fire({ title: "Please login to access" });
  }
}

function historyCheck(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next({ name: "Login" });
    Toast.fire({ title: "Please login to access" });
  }
}

const routes = [
  {
    name: "Main",
    path: "/",
    component: Main,
    // beforeEnter: guest,
  },
  {
    name: "SliderTest",
    path: "/slidertest",
    component: SliderTest,
    // beforeEnter: guest,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    beforeEnter: guest,
  },
  {
    name: "NaverLogin",
    path: "/callback/naverlogin",
    component: NaverLoginCallback,
  },
  {
    name: "KakaoLogin",
    path: "/callback/kakaologin",
    component: KakaoLoginCallback,
  },
  {
    name: "PaymentCallback",
    path: "/callback/payment",
    component: PaymentCallback,
  },
  {
    name: "MemberRegistrationTypeSelection",
    path: "/member-registration-type-selection",
    component: MemberRegistrationTypeSelection,
    // beforeEnter: guest,
  },
  {
    name: "MemberRegistrationIndividual",
    path: "/member-registration-individuals",
    component: MemberRegistrationIndividuals,
  },
  {
    name: "MembershipRegistrationBusiness",
    path: "/membership-registration-business",
    component: MembershipRegistrationBusiness,
  },

  {
    name: "personal-information",
    path: "/personal-information",
    component: PersonalInformation,
    beforeEnter: guard,
  },
  {
    name: "PersonalInformationBusiness",
    path: "/personal-information-business",
    component: PersonalInformationBusiness,
    beforeEnter: guard,
  },
  {
    name: "WithdrawalOfMembership",
    path: "/withdrawal-of-membership",
    component: WithdrawalOfMembership,
    beforeEnter: guard,
  },
  {
    name: "InquiryContactUs",
    path: "/inquiry-contactUs",
    component: InquiryContactUs,
    beforeEnter: guard,
  },
  {
    name: "Inquery",
    path: "/inquiry",
    component: Inquery,
    beforeEnter: guard,
  },
  {
    name: "MemberRegistrationMethod",
    path: "/method-selection",
    component: MemberRegistrationMethod,
    // beforeEnter: guest,
  },
  {
    name: "MemberRegistrationCompleted",
    path: "/member-registration-completed",
    component: RegistrationCompleted,
  },
  {
    name: "FindId",
    path: "/find-id",
    component: FindID,
    // beforeEnter: guest,
  },
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    name: "ChangePassword",
    path: "/change-password",
    component: ChangePassword,
    // beforeEnter: guest,
  },
  {
    name: "SearchResult",
    path: "/search-result",
    component: SearchResult,
    beforeEnter: guard,
  },
  {
    name: "MyChoice",
    path: "/my-choice",
    component: MyChoice,
    beforeEnter: guard,
  },
  {
    name: "MyChoiceCategorySelection",
    path: "/my-choice-category-selection/",
    component: MyChoiceCategorySelection,
    beforeEnter: guard,
  },
  {
    name: "MyChoiceRecomandedBlending",
    path: "/my-choice-recomanded-blending",
    component: MyChoiceRecomandedBlending,
    beforeEnter: guard,
  },
  {
    name: "MyChoiceRecomandedBlendingFinalQuote",
    path: "/my-choice-recomanded-blending-fquote",
    component: MyChoiceRecomandedBlendingFinalQuote,
    beforeEnter: guard,
  },
  {
    name: "sample-making",
    path: "/sample-making",
    component: SampleMaking,
  },
  {
    name: "ChoiceRecommendedBlendingDetailedPage",
    path: "/choice-recommended-blending-detailed-page/:id",
    component: ChoiceRecommendedBlendingDetailedPage,
    beforeEnter: guard,
  },
  {
    name: "ChoiceRecommendedBlendingPackageSelection",
    path: "/choice-recommended-blending-package-selection",
    component: ChoiceRecommendedBlendingPackageSelection,
    beforeEnter: guard,
  },
  {
    name: "MyChoiceRawMaterialDetailedPage",
    path: "/mychoice-rawMaterial-detailed-page/",
    component: MyChoiceRawMaterialDetailedPage,
    beforeEnter: guard,
  },
  {
    name: "RawMaterialEstimation",
    path: "/raw-material-estimation",
    component: RawMaterialEstimation,
    beforeEnter: guard,
  },
  {
    name: "RawMaterialPackage",
    path: "/raw-material-package",
    component: RawMaterialPackage,
    beforeEnter: guard,
  },
  {
    name: "IngredientFormulation",
    path: "/ingredient-formulation/",
    component: IngredientFormulation,
    beforeEnter: guard,
  },
  {
    name: "AddIngredient",
    path: "/add-ingredient/",
    component: AddIngredient,
    beforeEnter: guard,
  },
  {
    name: "notice",
    path: "/notice",
    component: Notice,
    beforeEnter: guard,
  },
  {
    name: "noticeDetailPage",
    path: "/notice-detail-page/:id",
    component: NoticeDetailPage,
    beforeEnter: guard,
  },
  {
    path: "/faq",
    name: "Faq",
    component: FAQ,
    // beforeEnter: guest,
  },
  {
    name: "MyRecipeDetails",
    path: "/my-recipe-details/:type/:id",
    component: MyRecipeDetails,
    //beforeEnter : guard
  },
  {
    name: "MyApplicationDetails",
    path: "/my-application-detail",
    component: MyApplicationDetails,
    //beforeEnter : guard
  },

  {
    name: "MyApplicationQuoteRequestChoice",
    path: "/my-application-quote-request-choice/:id",
    component: () =>
      import("../pages/OnlyMe/MyApplicationQuoteRequestChoice.vue"),
    beforeEnter: guard,
  },

  {
    name: "MyApplicationQuoteRequestBlending",
    path: "/my-application-quote-request-blend/:type/:id",
    component: () =>
      import("../pages/OnlyMe/MyApplicationQuoteRequestBlending.vue"),
    beforeEnter: guard,
  },

  {
    name: "MyRecipeDetailsEdit",
    path: "/my-recipe-detail-edit/:type/:id",
    component: MyRecipeDetailsEdit,
    beforeEnter: guard,
  },
  {
    name: "MyRecipeDetailsSample",
    path: "/my-recipe-details-sample/:type/:id",
    component: MyRecipeDetailsSample,
  },
  {
    name: "MyRecipeDetailsChoice",
    path: "/my-recipe-details-sample/:type/:id",
    component: MyRecipeDetailsChoice,
  },
  {
    name: "MyRecipe",
    path: "/my-recipe",
    component: MyRecipe,
    beforeEnter: guard,
  },
  {
    name: "AboutUs",
    path: "/about-us",
    component: AboutUs,
  },
  {
    name: "Terms",
    path: "/terms",
    component: Terms,
  },
  {
    name: "Privacy",
    path: "/privacy",
    component: Privacy,
  },
  {
    name: "ServiceIntro",
    path: "/service-intro",
    component: ServiceIntro,
    beforeEnter: guard,
  },
  {
    name: "NutriDetail",
    path: "/nutri-detail/:id",
    component: NutriDetail,
    beforeEnter: guard,
  },
  {
    name: "NutriFinalEstimation",
    path: "/nutri-final-estimate/:id",
    component: NutriFinalEstimation,
    beforeEnter: guard,
  },

  {
    name: "MyRecipeDetail",
    path: "/my-recipe-detail",
    component: MyRecipeDetail,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});

export default router;
