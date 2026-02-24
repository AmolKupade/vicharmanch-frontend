import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component'; // Import kara
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { FeedComponent } from './features/blog/feed/feed.component';
import { BlogDetailsComponent } from './features/blog/blog-details/blog-details.component';
import { CategoryListComponent } from './features/blog/category-list/category-list.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { OriginStoryComponent } from './pages/origin-story/origin-story.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { CreateComponent } from './features/blog/create/create.component';
import { PartnerProgramComponent } from './pages/partner-program/partner-program.component';
import { CreatorAnalyticsComponent } from './pages/creator-analytics/creator-analytics.component';
import { FormattingGuideComponent } from './pages/formatting-guide/formatting-guide.component';
import { CommunityRulesComponent } from './pages/community-rules/community-rules.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { BrandAssetsComponent } from './pages/brand-assets/brand-assets.component';
import { PodcastsComponent } from './pages/podcasts/podcasts.component';
import { CreatorApplyComponent } from './pages/creator-apply/creator-apply.component';
import { CreatorGuidelinesComponent } from './pages/creator-guidelines/creator-guidelines.component';
import { AuthComponent } from './features/auth/auth/auth.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default Home Page (Jithe Landing Page asel)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'category/:name', component: CategoryListComponent },
  { path: 'stories', component: StoriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'our-story', component: OriginStoryComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'create-blog', component: CreateComponent },
  { path: 'partner-program', component: PartnerProgramComponent },
  { path: 'creator-analytics', component: CreatorAnalyticsComponent },
  { path: 'formatting-guide', component: FormattingGuideComponent },
  { path: 'community-rules', component: CommunityRulesComponent },
  { path: 'help-center', component: HelpCenterComponent },
  { path: 'brand-assets', component: BrandAssetsComponent },
  { path: 'podcasts', component: PodcastsComponent },
  { path: 'creator-apply', component: CreatorApplyComponent },
  { path: 'creator-guidelines', component: CreatorGuidelinesComponent },
  { path: 'auth', component: AuthComponent },
];